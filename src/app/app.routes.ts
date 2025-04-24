import { Routes } from '@angular/router';
import { AlbumComponent } from '@src/app/pages/album/album.component';
import { ArtistComponent } from '@src/app/pages/artist/artist.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { SignInRedirectionComponent } from '@src/app/pages/login-redirection/sign-in-redirection.component';
import { NotFoundComponent } from '@src/app/pages/not-found/not-found.component';
import { RootComponent } from '@src/app/pages/root/root.component';
import { SearchComponent } from '@src/app/pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
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
  {
    path: 'callback',
    component: SignInRedirectionComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
