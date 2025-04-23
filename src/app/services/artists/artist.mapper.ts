import { Artist } from '@src/app/services/artists/artist';
import { GetArtistInfoDto } from '@src/app/services/artists/get-artist-info.dto';

export function mapGetArtistInfoToArtist(dto: GetArtistInfoDto): Artist {
  return {
    id: dto.id,
    name: dto.name,
    images:
      dto.images.length > 0
        ? dto.images.map((image) => image.url)
        : ['/img-placeholder.jpg'],
    genres: dto.genres,
    followers: dto.followers.total,
  };
}
