import { GetUserProfileDto } from '@src/app/services/users/get-user-profile.dto';
import { UserProfile } from '@src/app/services/users/user-profile';

export function mapGetUserProfileDtoToUserProfile(
  dto: GetUserProfileDto
): UserProfile {
  return {
    id: dto.id,
    displayName: dto.display_name,
    email: dto.email,
    images: dto.images.map((image) => image.url),
    followers: dto.followers.total,
  };
}
