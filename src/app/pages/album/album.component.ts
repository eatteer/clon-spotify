import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessageComponent } from '@src/app/components/ui/error-message/error-message.component';
import { LoaderComponent } from '@src/app/components/ui/loader/loader.component';
import { TrackComponent } from '@src/app/components/ui/track/track.component';
import { Album } from '@src/app/services/albums/album';
import { AlbumsService } from '@src/app/services/albums/albums.service';
import { Track } from '@src/app/services/albums/track';
import { EMPTY, Observable, catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-album',
  imports: [
    AsyncPipe,
    DatePipe,
    TrackComponent,
    LoaderComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly albumsService: AlbumsService = inject(AlbumsService);

  public isAlbumLoading: WritableSignal<boolean> = signal(true);
  public isTracksLoading: WritableSignal<boolean> = signal(false);

  public albumError: WritableSignal<string | null> = signal<string | null>(
    null
  );

  public tracksError: WritableSignal<string | null> = signal<string | null>(
    null
  );

  public album$: Observable<Album> = new Observable<Album>();
  public tracks$: Observable<Track[]> = new Observable<Track[]>();

  public ngOnInit(): void {
    this.album$ = this.route.params.pipe(
      tap(() => {
        this.isAlbumLoading.set(true);
        this.albumError.set(null);
      }),
      switchMap((params) => {
        const albumId: string = params['id'];

        return this.albumsService.getInfo(albumId).pipe(
          tap(() => this.isAlbumLoading.set(false)),
          catchError((error) => {
            this.isAlbumLoading.set(false);

            this.albumError.set(
              'Unable to load album information. Please try again later.'
            );

            console.error('Error loading album information:', error);

            return EMPTY;
          })
        );
      })
    );

    this.tracks$ = this.route.params.pipe(
      tap(() => {
        this.isTracksLoading.set(true);
        this.tracksError.set(null);
      }),
      switchMap((params) => {
        const albumId: string = params['id'];
        return this.albumsService.getTracks(albumId).pipe(
          tap(() => this.isTracksLoading.set(false)),
          catchError((error) => {
            this.isTracksLoading.set(false);
            this.tracksError.set(
              'Unable to load tracks. Please try again later.'
            );
            console.error('Error loading tracks:', error);
            return of([]);
          })
        );
      })
    );
  }
}
