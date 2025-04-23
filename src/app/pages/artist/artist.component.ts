import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Album } from '@src/app/services/artists/Album';
import { ArtistsService } from '@src/app/services/artists/artists.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-artist',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
})
export class ArtistComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly artistsService = inject(ArtistsService);

  public albums$!: Observable<Album[]>;

  public ngOnInit(): void {
    this.albums$ = this.route.params.pipe(
      switchMap((params) => {
        const artistId = params['id'];
        return this.artistsService.getAlbums(artistId);
      })
    );
  }
}
