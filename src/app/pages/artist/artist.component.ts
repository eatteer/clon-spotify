import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Album } from '@src/app/services/artists/Album';
import { Artist } from '@src/app/services/artists/artist';
import { ArtistsService } from '@src/app/services/artists/artists.service';
import { Observable, switchMap } from 'rxjs';
import { TitleCaseArrayPipe } from '../../pipes/title-case.pipe';

@Component({
  selector: 'app-artist',
  imports: [AsyncPipe, DatePipe, DecimalPipe, TitleCaseArrayPipe, RouterLink],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
})
export class ArtistComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly artistsService = inject(ArtistsService);

  public artist$: Observable<Artist> = new Observable<Artist>();
  public albums$: Observable<Album[]> = new Observable<Album[]>();

  public ngOnInit(): void {
    this.artist$ = this.route.params.pipe(
      switchMap((params) => {
        const artistId = params['id'];
        return this.artistsService.getInfo(artistId);
      })
    );

    this.albums$ = this.route.params.pipe(
      switchMap((params) => {
        const artistId = params['id'];
        return this.artistsService.getAlbums(artistId);
      })
    );
  }
}
