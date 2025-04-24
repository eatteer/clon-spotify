import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TitleCaseArrayPipe } from '@src/app/pipes/title-case.pipe';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [DecimalPipe, TitleCaseArrayPipe],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent {
  @Input() artist!: {
    id: string;
    name: string;
    image: string;
    followers: number;
    genres: string[];
  };
}
