import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly http = inject(HttpClient);

  private readonly CLIENT_ID = environment.SPOTIFY_CLIENT_ID;
  private readonly CLIENT_SECRET = environment.SPOTIFY_CLIENT_SECRET;
  private readonly TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

  private accessToken: string = '';

  public getToken(): string {
    return this.accessToken;
  }

  public setToken(token: string): void {
    this.accessToken = token;
  }

  public isTokenValid(): boolean {
    return !!this.accessToken;
  }

  public refreshToken(): Observable<string> {
    const urlencoded = new URLSearchParams();

    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('client_id', this.CLIENT_ID);
    urlencoded.append('client_secret', this.CLIENT_SECRET);

    return this.http
      .post<{ access_token: string }>(
        this.TOKEN_ENDPOINT,
        urlencoded.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
        }),
        map((response) => response.access_token),
        catchError((error) => {
          console.error('Error refreshing token:', error);
          return throwError(() => new Error('Failed to refresh token'));
        })
      );
  }
}
