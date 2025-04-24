import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCaseArrayPipe } from '@src/app/pipes/title-case.pipe';
import { Album } from '@src/app/services/artists/album';
import { Artist } from '@src/app/services/artists/artist';
import { ArtistsService } from '@src/app/services/artists/artists.service';
import { EMPTY, Observable, catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-artist',
  imports: [AsyncPipe, DatePipe, DecimalPipe, TitleCaseArrayPipe, RouterLink],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
})
export class ArtistComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly artistsService: ArtistsService = inject(ArtistsService);

  public isArtistLoading = signal(true);
  public isAlbumsLoading = signal(false);

  public artistError = signal<string | null>(null);
  public albumsError = signal<string | null>(null);

  public artist$: Observable<Artist> = new Observable<Artist>();
  public albums$: Observable<Album[]> = new Observable<Album[]>();

  public ngOnInit(): void {
    this.artist$ = this.route.params.pipe(
      tap(() => {
        this.isArtistLoading.set(true);
        this.artistError.set(null);
      }),
      switchMap((params) => {
        const artistId: string = params['id'];
        return this.artistsService.getInfo(artistId).pipe(
          tap(() => this.isArtistLoading.set(false)),
          catchError((error) => {
            this.isArtistLoading.set(false);
            this.artistError.set(
              'Unable to load artist information. Please try again later.'
            );
            console.error('Error loading artist information:', error);
            return EMPTY;
          })
        );
      })
    );

    this.albums$ = this.route.params.pipe(
      tap(() => {
        this.isAlbumsLoading.set(true);
        this.albumsError.set(null);
      }),
      switchMap((params) => {
        const artistId: string = params['id'];
        return this.artistsService.getAlbums(artistId).pipe(
          tap(() => this.isAlbumsLoading.set(false)),
          catchError((error) => {
            this.isAlbumsLoading.set(false);
            this.albumsError.set(
              'Unable to load albums. Please try again later.'
            );
            console.error('Error loading albums:', error);
            return of([]);
          })
        );
      })
    );
  }
}
