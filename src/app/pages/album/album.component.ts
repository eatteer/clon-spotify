import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '@src/app/services/albums/albums.service';
import { Track } from '@src/app/services/albums/track';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-album',
  imports: [AsyncPipe],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly albumsService = inject(AlbumsService);

  public tracks!: Observable<Track[]>;

  public ngOnInit(): void {
    this.tracks = this.route.params.pipe(
      switchMap((params) => {
        const albumId = params['id'];
        return this.albumsService.getTracks(albumId);
      })
    );
  }
}
