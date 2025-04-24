import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  @Input() album!: {
    id: string;
    name: string;
    image: string;
    releaseDate: string;
  };
}
