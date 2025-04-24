import { AsyncPipe } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { SignInButtonComponent } from '@src/app/components/ui/sign-in-button/sign-in-button.component';
import { UserService } from '@src/app/providers/user.service';
import { Playlist } from '@src/app/services/users/playlist';
import { UserProfile } from '@src/app/services/users/user-profile';
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

  public isUserLoading: WritableSignal<boolean> = signal(true);
  public isPlaylistsLoading: WritableSignal<boolean> = signal(false);

  public userError: WritableSignal<string | null> = signal<string | null>(null);

  public playlistsError: WritableSignal<string | null> = signal<string | null>(
    null
  );

  public user$: Observable<UserProfile | null> = this.userService
    .getUserProfile()
    .pipe(
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
