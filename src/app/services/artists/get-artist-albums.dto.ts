export type GetArtistAlbumsDto = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: Item[];
};

export type Item = {
  album_type: AlbumGroup;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  type: AlbumGroup;
  uri: string;
  artists: Artist[];
  album_group: AlbumGroup;
};

export enum AlbumGroup {
  Album = 'album',
}

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  name: Name;
  type: Type;
  uri: URI;
};

export type ExternalUrls = {
  spotify: string;
};

export enum ID {
  The49Z1AVGeUaBSANPaOmplK6 = '49Z1AvGeUaBSanPaOmplK6',
}

export enum Name {
  AndrésCepeda = 'Andrés Cepeda',
}

export enum Type {
  Artist = 'artist',
}

export enum URI {
  SpotifyArtist49Z1AVGeUaBSANPaOmplK6 = 'spotify:artist:49Z1AvGeUaBSanPaOmplK6',
}

export type Image = {
  url: string;
  height: number;
  width: number;
};

export enum ReleaseDatePrecision {
  Day = 'day',
}
