import { Album } from '@src/app/services/albums/Album';
import { GetAlbumInfoDto } from '@src/app/services/albums/get-album-info.dto';

export function mapGetAlbumInfoDtoToAlbum(dto: GetAlbumInfoDto): Album {
  return {
    id: dto.id,
    name: dto.name,
    images:
      dto.images.length > 0
        ? dto.images.map((image) => image.url)
        : ['/placeholder.png'],
    releaseDate: dto.release_date,
    genres: dto.genres,
    totalTracks: dto.total_tracks,
  };
}
