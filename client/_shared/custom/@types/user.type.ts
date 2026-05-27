import { MenuProfileSchemaType } from "@/features/menu/profile/mp.forms/mp.schema";
import { UseFormRegister } from "react-hook-form";

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

export type MenuProfileInputProps = {
  label: string;
  name: keyof MenuProfileSchemaType;
  register: UseFormRegister<MenuProfileSchemaType>;
  error?: any;
};
