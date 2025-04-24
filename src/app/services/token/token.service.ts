import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppService } from '@src/app/providers/app.service';
import { UserService } from '@src/app/providers/user.service';
import { AccessTokenPair } from '@src/app/services/token/access-token-pair';
import { RequestAccessTokenPairDto } from '@src/app/services/token/request-access-token-pair.dto';
import { environment } from '@src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly http = inject(HttpClient);
  private readonly appService = inject(AppService);
  private readonly userService = inject(UserService);

  private readonly clientId = environment.SPOTIFY_CLIENT_ID;
  private readonly clientSecret = environment.SPOTIFY_CLIENT_SECRET;
  private readonly endpoint = `https://accounts.spotify.com/api/token`;

  public requestUserAccessToken(code: string): Observable<AccessTokenPair> {
    const urlencoded: URLSearchParams = new URLSearchParams();

    urlencoded.append('grant_type', 'authorization_code');
    urlencoded.append('code', code);
    urlencoded.append('redirect_uri', environment.SPOTIFY_REDIRECT_URI);
    urlencoded.append('client_id', this.clientId);
    urlencoded.append('client_secret', this.clientSecret);

    return this.http
      .post<RequestAccessTokenPairDto>(this.endpoint, urlencoded.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map(({ access_token, refresh_token }) => {
          this.userService.setAccessTokenPair({
            accessToken: access_token,
            refreshToken: refresh_token,
          });

          return {
            accessToken: access_token,
            refreshToken: refresh_token,
          };
        }),
        catchError((error) => {
          console.error('Error requesting user access token:', error);
          return throwError(() => new Error('Failed to get user access token'));
        })
      );
  }

  public requestAppAccessToken(): Observable<string> {
    const urlencoded: URLSearchParams = new URLSearchParams();

    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('client_id', this.clientId);
    urlencoded.append('client_secret', this.clientSecret);

    return this.http
      .post<{ access_token: string }>(this.endpoint, urlencoded.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map((response) => {
          this.appService.setAccessToken(response.access_token);

          return response.access_token;
        }),
        catchError((error) => {
          console.error('Error refreshing app token:', error);

          return throwError(() => new Error('Failed to refresh app token'));
        })
      );
  }

  public refreshUserAccessToken(
    refreshToken: string
  ): Observable<AccessTokenPair> {
    const urlencoded: URLSearchParams = new URLSearchParams();

    urlencoded.append('grant_type', 'refresh_token');
    urlencoded.append('refresh_token', refreshToken);
    urlencoded.append('client_id', this.clientId);

    return this.http
      .post<RequestAccessTokenPairDto>(this.endpoint, urlencoded.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map(({ access_token, refresh_token }) => {
          this.userService.setAccessTokenPair({
            accessToken: access_token,
            refreshToken: refresh_token,
          });

          return {
            accessToken: access_token,
            refreshToken: refresh_token,
          };
        })
      );
  }
}
