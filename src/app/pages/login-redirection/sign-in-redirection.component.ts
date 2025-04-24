import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@src/app/providers/user.service';
import { TokenService } from '@src/app/services/token/token.service';
import { UsersService } from '@src/app/services/users/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login-redirection',
  imports: [],
  templateUrl: './sign-in-redirection.component.html',
  styleUrl: './sign-in-redirection.component.css',
})
export class SignInRedirectionComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly activateRouted: ActivatedRoute = inject(ActivatedRoute);
  private readonly tokenService: TokenService = inject(TokenService);
  private readonly userService: UserService = inject(UserService);
  private readonly usersService: UsersService = inject(UsersService);

  public ngOnInit(): void {
    const code: string | undefined =
      this.activateRouted.snapshot.queryParams['code'];

    if (!code) {
      console.error('No code found in URL');
      this.router.navigate(['/']);
      return;
    }

    this.tokenService
      .requestUserAccessToken(code)
      .pipe(
        switchMap((accessToken) => {
          this.userService.setAccessToken(accessToken);
          return this.usersService.getProfile();
        }),
        switchMap((userProfile) => {
          this.userService.setUserProfile(userProfile);
          return this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
