import { Component, Input } from '@angular/core';
import { DurationPipe } from '@src/app/pipes/duration.pipe';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [DurationPipe],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css',
})
export class TrackComponent {
  @Input()
  public track!: {
    id: string;
    name: string;
    artists: string[];
    duration: number;
    trackUrl: string;
  };
}
