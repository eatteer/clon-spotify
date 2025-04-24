import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private accessToken: string = '';

  public getAccessToken(): string {
    return this.accessToken;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  public isTokenValid(): boolean {
    return !!this.accessToken;
  }

  public clearSession(): void {
    this.accessToken = '';
  }
}
