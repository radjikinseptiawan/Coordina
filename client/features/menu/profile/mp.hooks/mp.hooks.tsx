import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  InputProfilDataType,
  MenuProfileSchemaType,
} from "../mp.forms/mp.schema";

export const useMenuProfileForms = () => {
  return useForm({
    resolver: zodResolver(MenuProfileSchemaType),
    defaultValues: {
      username: "",
      image: "",
      email: "",
      number_phone: "",
      fullname: "",
    },
  });
};

export const fieldInput: InputProfilDataType[] = [
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Fullname",
    name: "fullname",
  },
  {
    label: "Number Phone",
    name: "number_phone",
  },
];
