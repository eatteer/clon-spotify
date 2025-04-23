export type GetAlbumTracksDto = {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
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
