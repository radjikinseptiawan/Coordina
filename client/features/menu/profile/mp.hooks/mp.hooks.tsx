import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MenuProfileSchemaType } from "../mp.forms/mp.schema";

export const useMenuProfileForms = () => {
  return useForm({
    resolver: zodResolver(MenuProfileSchemaType),
    defaultValues: {
      username: "",
      image: "",
      email: "",
      //   number_phone: "",
      //   fullname: "",
    },
  });
};
