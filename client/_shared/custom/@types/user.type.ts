export type SpesificUsersType = {
  email: string | null;
  username: string | null;
  user_profile: DetailUser;
};

export type DetailUser = {
  image: string | null;
  fullname: string | null;
  number_phone: string | null;
};
