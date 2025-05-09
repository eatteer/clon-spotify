import { Injectable } from '@angular/core';
import { AccessTokenPair } from '@src/app/services/token/access-token-pair';
import { UserProfile } from '@src/app/services/users/user-profile';
import { BehaviorSubject, Observable } from 'rxjs';

export const ACCESS_TOKEN_KEY = 'accessTokenPair';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userProfile: BehaviorSubject<UserProfile | null> =
    new BehaviorSubject<UserProfile | null>(null);

  private accessToken: string = '';
  private refreshToken: string = '';

  public constructor() {
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage(): void {
    const storedTokens: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (storedTokens) {
      try {
        const { accessToken, refreshToken } = JSON.parse(
          storedTokens
        ) as AccessTokenPair;

        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
      } catch (error) {
        console.error('Error parsing stored tokens:', error);

        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    }
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  public setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  public setAccessTokenPair({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);

    const accessTokenPair: AccessTokenPair = {
      accessToken,
      refreshToken,
    };

    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessTokenPair));
  }

  public isTokenValid(): boolean {
    return !!this.accessToken;
  }

  public getUserProfile(): Observable<UserProfile | null> {
    return this.userProfile.asObservable();
  }

  public setUserProfile(profile: UserProfile): void {
    this.userProfile.next(profile);
  }

  public signOut(): void {
    this.setAccessToken('');
    this.setRefreshToken('');

    this.userProfile.next(null);

    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  public isLoggedIn(): boolean {
    return !!this.userProfile.value;
  }
}
