import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TOKEN_TYPE } from '@src/app/interceptors/token-context';
import { AppService } from '@src/app/providers/app.service';
import { UserService } from '@src/app/providers/user.service';
import { TokenService } from '@src/app/services/token/token.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

function isTokenExpiredError(error: HttpErrorResponse): boolean {
  return (
    error.status === 401 &&
    error.error?.error?.message === 'The access token expired'
  );
}

export enum TokenType {
  APP = 'app',
  USER = 'user',
}

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const tokenService: TokenService = inject(TokenService);
  const appSessionService: AppService = inject(AppService);
  const userService: UserService = inject(UserService);

  // Skip adding the token for the token refresh request itself
  if (req.url === 'https://accounts.spotify.com/api/token') {
    return next(req);
  }

  const tokenType = req.context.get(TOKEN_TYPE);

  // Determine which token to use based on the requested token type
  let token: string;

  switch (tokenType) {
    case TokenType.USER:
      // For user-specific endpoints, require user token
      token = userService.getAccessToken();

      if (!token) {
        // If user token is required but not available, return an error
        return throwError(() => new Error('User authentication required'));
      }

      break;
    case TokenType.APP:
    default:
      // For public endpoints, use app token
      token = appSessionService.getAccessToken();

      if (!token) {
        // If app token is not available, request a new one
        return tokenService.requestAppAccessToken().pipe(
          switchMap((newToken) => {
            const requestWithToken = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            return next(requestWithToken);
          })
        );
      }
      break;
  }

  const requestWithToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(requestWithToken).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log({ error });

      // Check if the error is due to an expired token
      if (isTokenExpiredError(error)) {
        // Determine which token to refresh based on the token type
        if (tokenType === TokenType.USER) {
          // Try to refresh the user token if we have a refresh token
          const refreshToken = userService.getRefreshToken();

          if (refreshToken) {
            return tokenService.refreshUserAccessToken(refreshToken).pipe(
              switchMap((tokens) => {
                // Retry the request with the new token
                const requestWithNewToken = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                  },
                });

                return next(requestWithNewToken);
              }),
              catchError((refreshError) => {
                // If refresh fails, sign out and notify the user
                console.error('Error refreshing user token:', refreshError);

                userService.signOut();

                return throwError(
                  () => new Error('Session expired, please login again')
                );
              })
            );
          } else {
            // No refresh token available, sign out
            userService.signOut();

            return throwError(
              () => new Error('User authentication expired, please login again')
            );
          }
        } else {
          // App token expired - refresh it
          return tokenService.requestAppAccessToken().pipe(
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
      }

      return throwError(() => error);
    })
  );
}
