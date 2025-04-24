import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const DEBOUNCE_TIME = 800;

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent {
  @Output()
  public search: EventEmitter<string> = new EventEmitter<string>();

  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(DEBOUNCE_TIME))
      .subscribe((searchTerm) => {
        this.search.emit(searchTerm);
      });
  }

  public onSearchInputChange(event: Event): void {
    const searchTerm: string = (event.target as HTMLInputElement).value;

    this.searchSubject.next(searchTerm);
  }
}
