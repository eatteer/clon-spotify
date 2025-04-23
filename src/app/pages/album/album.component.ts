import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DurationPipe } from '@src/app/pipes/duration.pipe';
import { Album } from '@src/app/services/albums/Album';
import { AlbumsService } from '@src/app/services/albums/albums.service';
import { Track } from '@src/app/services/albums/track';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-album',
  imports: [AsyncPipe, DatePipe, DurationPipe],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly albumsService = inject(AlbumsService);

  public album$: Observable<Album> = new Observable<Album>();
  public tracks$: Observable<Track[]> = new Observable<Track[]>();

  public ngOnInit(): void {
    this.album$ = this.route.params.pipe(
      switchMap((params) => {
        const albumId = params['id'];
        return this.albumsService.getInfo(albumId);
      })
    );

    this.tracks$ = this.route.params.pipe(
      switchMap((params) => {
        const albumId = params['id'];
        return this.albumsService.getTracks(albumId);
      })
    );
  }
}
