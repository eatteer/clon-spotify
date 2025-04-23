import { Artist } from '@src/app/services/search/artist';
import { Item } from '@src/app/services/search/search-artist.dto';

export function mapSearchArtistDtoToArtist(dto: Item): Artist {
  return {
    id: dto.id,
    name: dto.name,
    image: dto.images.length > 0 ? dto.images[0].url : '/placeholder.png',
    followers: dto.followers.total,
    genres: dto.genres,
  };
}
