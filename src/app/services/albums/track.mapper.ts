import { Item } from '@src/app/services/albums/get-album-tracks.dto';
import { Track } from '@src/app/services/albums/track';

export function mapGetAlbumTrackDtoToTrack(dto: Item): Track {
  return {
    id: dto.id,
    name: dto.name,
    duration: dto.duration_ms,
    trackUrl: dto.external_urls.spotify,
  };
}
