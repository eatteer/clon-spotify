import { Item } from '@src/app/services/users/get-user-playlists.dto';
import { Playlist } from '@src/app/services/users/playlist';

export function mapGetUserPlaylistsDtoToPlaylists(dto: Item): Playlist {
  return {
    id: dto.id,
    name: dto.name,
    images: dto.images.map((image) => image.url),
    totalTracks: dto.tracks.total,
    playlistUrl: dto.external_urls.spotify,
  };
}
