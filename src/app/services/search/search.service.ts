import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Artist } from '@src/app/services/search/artist';
import { mapSearchArtistDtoToArtist } from '@src/app/services/search/artist.mapper';
import { SearchType } from '@src/app/services/search/enums';
import { SearchArtisDto } from '@src/app/services/search/search-artist.dto';
import { environment } from '@src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  public searchArtist(query: string): Observable<Artist[]> {
    return this.http
      .get<SearchArtisDto>(`${environment.SPOTIFY_API_BASE_URL}/search`, {
        params: {
          q: query,
          type: SearchType.Artist,
        },
      })
      .pipe(map((dto) => dto.artists.items.map(mapSearchArtistDtoToArtist)));
  }
}
