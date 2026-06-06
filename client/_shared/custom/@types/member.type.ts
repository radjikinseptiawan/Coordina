export type Member = {
  role: string;
  created_at: string;
  member: {
    fullname: string;
    image: string;
    number_phone: string;
  };
  account: {
    email: string;
    username: string;
  };
};
