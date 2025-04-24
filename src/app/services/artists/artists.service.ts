import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Album } from '@src/app/services/artists/album';
import { mapGetArtisAlbumDtoToAlbum } from '@src/app/services/artists/album.mapper';
import { Artist } from '@src/app/services/artists/artist';
import { mapGetArtistInfoToArtist } from '@src/app/services/artists/artist.mapper';
import { GetArtistAlbumsDto } from '@src/app/services/artists/get-artist-albums.dto';
import { GetArtistInfoDto } from '@src/app/services/artists/get-artist-info.dto';
import { environment } from '@src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private readonly http: HttpClient = inject(HttpClient);

  public getInfo(artistId: string): Observable<Artist> {
    return this.http
      .get<GetArtistInfoDto>(
        `${environment.SPOTIFY_API_BASE_URL}/artists/${artistId}`
      )
      .pipe(map(mapGetArtistInfoToArtist));
  }

  public getAlbums(artistId: string): Observable<Album[]> {
    return this.http
      .get<GetArtistAlbumsDto>(
        `${environment.SPOTIFY_API_BASE_URL}/artists/${artistId}/albums`,
        {}
      )
      .pipe(map((dto) => dto.items.map(mapGetArtisAlbumDtoToAlbum)));
  }
}
