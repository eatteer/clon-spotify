import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../providers/token.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const tokenService = inject(TokenService);

  // Skip adding the token for the token refresh request itself
  if (req.url === 'https://accounts.spotify.com/api/token') {
    return next(req);
  }

  // If we don't have a token yet, get one first
  if (!tokenService.isTokenValid()) {
    return tokenService.refreshToken().pipe(
      switchMap((token) => {
        const requestWithToken = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(requestWithToken);
      })
    );
  }

  // We have a token, proceed with the request
  const requestWithToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  });

  return next(requestWithToken).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log({ error });

      // Check if the error is due to an expired token
      if (isTokenExpiredError(error)) {
        return tokenService.refreshToken().pipe(
          switchMap((newToken) => {
            const requestWithNewToken = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next(requestWithNewToken);
          })
        );
      }

      return throwError(() => error);
    })
  );
}

function isTokenExpiredError(error: HttpErrorResponse): boolean {
  return (
    error.status === 401 &&
    error.error?.error?.message === 'The access token expired'
  );
}
