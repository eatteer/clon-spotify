import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-sign-in-button',
  imports: [CommonModule],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.css',
})
export class SignInButtonComponent {
  @Input()
  public variant: 'primary' | 'rounded' = 'rounded';

  public signInHref: string = `https://accounts.spotify.com/authorize?client_id=${environment.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${environment.SPOTIFY_REDIRECT_URI}&scope=user-read-private user-read-email playlist-read-private playlist-read-collaborative`;
}
