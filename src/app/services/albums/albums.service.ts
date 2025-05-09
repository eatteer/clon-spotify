import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Album } from '@src/app/services/albums/album';
import { mapGetAlbumInfoDtoToAlbum } from '@src/app/services/albums/album.mapper';
import { GetAlbumInfoDto } from '@src/app/services/albums/get-album-info.dto';
import { GetAlbumTracksDto } from '@src/app/services/albums/get-album-tracks.dto';
import { Track } from '@src/app/services/albums/track';
import { mapGetAlbumTrackDtoToTrack } from '@src/app/services/albums/track.mapper';
import { environment } from '@src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private readonly http: HttpClient = inject(HttpClient);

  public getInfo(albumId: string): Observable<Album> {
    return this.http
      .get<GetAlbumInfoDto>(
        `${environment.SPOTIFY_API_BASE_URL}/albums/${albumId}`
      )
      .pipe(map(mapGetAlbumInfoDtoToAlbum));
  }

  public getTracks(albumId: string): Observable<Track[]> {
    return this.http
      .get<GetAlbumTracksDto>(
        `${environment.SPOTIFY_API_BASE_URL}/albums/${albumId}/tracks`,
        {}
      )
      .pipe(map((dto) => dto.items.map(mapGetAlbumTrackDtoToTrack)));
  }
}
