import { Routes } from '@angular/router';
import { AlbumComponent } from '@src/app/pages/album/album.component';
import { ArtistComponent } from '@src/app/pages/artist/artist.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { SearchComponent } from '@src/app/pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'search/:query',
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
    ],
  },
];
