export type Member = {
  id: string;
  role: {
    id: string;
    name: string;
  };
  created_at: string;
  member: {
    id: string;
    created_at: string;
    fullname: string;
    image: string;
    number_phone: string;
  };
  account: {
    email: string;
    username: string;
  };
};
