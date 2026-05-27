export type AccountDataType = {
  username: string;
  email: string;
  created_at: string;
};

export type ProfileDataType = {
  fullname: string | null;
  image: string | null;
  number_phone: string | null;
  account: AccountDataType;
};
