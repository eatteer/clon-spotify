import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@src/app/app.routes';
import { authInterceptor } from '@src/app/interceptors/auth.interceptor';
import { UserService } from '@src/app/providers/user.service';
import { UsersService } from '@src/app/services/users/users.service';
import { EMPTY, catchError, of, tap } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const userService: UserService = inject(UserService);
      const usersService: UsersService = inject(UsersService);

      // If user has valid token, fetch profile
      if (userService.isTokenValid()) {
        return usersService.getProfile().pipe(
          tap((userProfile) => {
            userService.setUserProfile(userProfile);
          }),
          catchError((error) => {
            console.error('Error loading user profile on init:', error);
            return EMPTY;
          })
        );
      }

      // If no valid token, just continue
      return of(null);
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
