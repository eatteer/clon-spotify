import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css',
})
export class PlaylistComponent {
  @Input() playlist!: {
    id: string;
    name: string;
    images: string[];
    totalTracks: number;
    playlistUrl: string;
  };
}
