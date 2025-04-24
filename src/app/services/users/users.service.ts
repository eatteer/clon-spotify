import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenType } from '@src/app/interceptors/auth.interceptor';
import { TOKEN_TYPE } from '@src/app/interceptors/token-context';
import { GetUserPlaylistsDto } from '@src/app/services/users/get-user-playlists.dto';
import { GetUserProfileDto } from '@src/app/services/users/get-user-profile.dto';
import { Playlist } from '@src/app/services/users/playlist';
import { mapGetUserPlaylistsDtoToPlaylists } from '@src/app/services/users/playlists.mapper';
import { UserProfile } from '@src/app/services/users/user-profile';
import { mapGetUserProfileDtoToUserProfile } from '@src/app/services/users/user-profile.mapper';
import { environment } from '@src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http: HttpClient = inject(HttpClient);

  public getProfile(): Observable<UserProfile> {
    return this.http
      .get<GetUserProfileDto>(`${environment.SPOTIFY_API_BASE_URL}/me`, {
        context: new HttpContext().set(TOKEN_TYPE, TokenType.USER),
      })
      .pipe(map(mapGetUserProfileDtoToUserProfile));
  }

  public getPlaylist(usersId: string): Observable<Playlist[]> {
    return this.http
      .get<GetUserPlaylistsDto>(
        `${environment.SPOTIFY_API_BASE_URL}/users/${usersId}/playlists`,
        {
          context: new HttpContext().set(TOKEN_TYPE, TokenType.USER),
        }
      )
      .pipe(map((dto) => dto.items.map(mapGetUserPlaylistsDtoToPlaylists)));
  }
}
