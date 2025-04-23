import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Album } from '@src/app/services/artists/Album';
import { mapGetArtisAlbumDtoToAlbum } from '@src/app/services/artists/album.mapper';
import { GetArtistAlbumsDto } from '@src/app/services/artists/get-artist-albums.dto';
import { environment } from '@src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private readonly http = inject(HttpClient);

  public getAlbums(artistId: string): Observable<Album[]> {
    return this.http
      .get<GetArtistAlbumsDto>(
        `${environment.SPOTIFY_API_BASE_URL}/artists/${artistId}/albums`,
        {}
      )
      .pipe(map((dto) => dto.items.map(mapGetArtisAlbumDtoToAlbum)));
  }
}
