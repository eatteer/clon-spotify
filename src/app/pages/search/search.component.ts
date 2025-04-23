import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCaseArrayPipe } from '@src/app/pipes/title-case.pipe';
import { Artist } from '@src/app/services/search/artist';
import { SearchService } from '@src/app/services/search/search.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, DecimalPipe, TitleCaseArrayPipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private readonly searchService = inject(SearchService);
  private readonly route = inject(ActivatedRoute);

  public artists$: Observable<Artist[]> = new Observable<Artist[]>();

  public ngOnInit(): void {
    this.artists$ = this.route.params.pipe(
      switchMap((params) => {
        const query = params['query'];
        return this.searchService.searchArtist(query);
      })
    );
  }
}
