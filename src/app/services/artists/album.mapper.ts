import { Album } from '@src/app/services/artists/album';
import { Item } from '@src/app/services/artists/get-artist-albums.dto';

export function mapGetArtisAlbumDtoToAlbum(dto: Item): Album {
  return {
    id: dto.id,
    name: dto.name,
    image: dto.images.length > 0 ? dto.images[0].url : '/placeholder.png',
    releaseDate: dto.release_date,
  };
}
