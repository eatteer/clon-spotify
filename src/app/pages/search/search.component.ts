import { AsyncPipe, DecimalPipe } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCaseArrayPipe } from '@src/app/pipes/title-case.pipe';
import { Artist } from '@src/app/services/search/artist';
import { SearchService } from '@src/app/services/search/search.service';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, DecimalPipe, TitleCaseArrayPipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly searchService: SearchService = inject(SearchService);

  public artists$: Observable<Artist[]> = new Observable<Artist[]>();

  public isArtistsLoading: WritableSignal<boolean> = signal(true);

  public artistsError: WritableSignal<string | null> = signal<string | null>(
    null
  );

  public ngOnInit(): void {
    this.artists$ = this.route.params.pipe(
      tap(() => {
        this.isArtistsLoading.set(true);
        this.artistsError.set(null);
      }),
      switchMap((params) => {
        const query: string = params['query'];

        return this.searchService.searchArtist(query).pipe(
          tap(() => this.isArtistsLoading.set(false)),
          catchError((error) => {
            this.isArtistsLoading.set(false);

            this.artistsError.set(
              'Unable to load artists. Please try again later.'
            );

            console.error('Error loading artists:', error);

            return of([]);
          })
        );
      })
    );
  }
}
