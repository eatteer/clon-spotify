export type GetAlbumInfoDto = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  genres: any[];
  label: string;
  popularity: number;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: Type;
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export enum Type {
  Artist = 'artist',
}

export type Copyright = {
  text: string;
  type: string;
};

export type ExternalIDS = {
  upc: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type Tracks = {
  href: string;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
  items: Item[];
};

export type Item = {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};
