export interface EditProfileDto {
  fullname: string;
  image?: {
    url: string;
  };
  email: string;
  username: string;
  number_phone: string;
  photo: string;
}
