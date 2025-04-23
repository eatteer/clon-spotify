import { Routes } from '@angular/router';
import { AlbumComponent } from '@src/app/pages/album/album.component';
import { ArtistComponent } from '@src/app/pages/artist/artist.component';
import { SearchComponent } from '@src/app/pages/search/search.component';

export const routes: Routes = [
  {
    path: 'artists',
    component: SearchComponent,
  },
  {
    path: 'artists/:id',
    component: ArtistComponent,
  },
  {
    path: 'albums/:id',
    component: AlbumComponent,
  },
];
