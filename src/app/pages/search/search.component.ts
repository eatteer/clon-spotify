import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Artist } from '@src/app/services/search/artist';
import { SearchService } from '@src/app/services/search/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private readonly searchService = inject(SearchService);

  public artists$!: Observable<Artist[]>;

  public ngOnInit(): void {
    this.artists$ = this.searchService.searchArtist('andres cepeda');
  }
}
