import { Injectable } from '@angular/core';
import { UserProfile } from '@src/app/services/users/user-profile';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userProfile: BehaviorSubject<UserProfile | null> =
    new BehaviorSubject<UserProfile | null>(null);

  private accessToken: string = '';
  private refreshToken: string = '';

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
    this.accessToken = '';
    this.userProfile.next(null);
  }

  public isLoggedIn(): boolean {
    return !!this.userProfile.value;
  }
}
