import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SignInButtonComponent } from '@src/app/components/ui/sign-in-button/sign-in-button.component';
import { UserService } from '@src/app/providers/user.service';
import { Playlist } from '@src/app/services/users/playlist';
import { UsersService } from '@src/app/services/users/users.service';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, SignInButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly userService: UserService = inject(UserService);
  private readonly usersService: UsersService = inject(UsersService);

  public isUserLoading = signal(true);
  public isPlaylistsLoading = signal(false);

  public userError = signal<string | null>(null);
  public playlistsError = signal<string | null>(null);

  public user$ = this.userService.getUserProfile().pipe(
    tap(() => this.isUserLoading.set(false)),
    catchError((error) => {
      this.isUserLoading.set(false);

      this.userError.set(
        'Unable to load user profile. Please try again later.'
      );

      console.error('Error loading user profile:', error);

      return of(null);
    })
  );

  public playlists$: Observable<Playlist[]> = new Observable<Playlist[]>();

  public ngOnInit() {
    this.playlists$ = this.user$.pipe(
      switchMap((user) => {
        if (!user) return of([]);

        this.isPlaylistsLoading.set(true);
        this.playlistsError.set(null);

        return this.usersService.getPlaylist(user.id).pipe(
          tap(() => this.isPlaylistsLoading.set(false)),
          catchError((error) => {
            this.isPlaylistsLoading.set(false);

            this.playlistsError.set(
              'Unable to load playlists. Please try again later.'
            );

            console.error('Error loading playlists:', error);

            return of([]);
          })
        );
      })
    );
  }
}
