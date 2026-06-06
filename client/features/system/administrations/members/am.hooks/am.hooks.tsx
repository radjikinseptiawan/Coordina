import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FoundSchemaByEmailorUsername } from "../am.forms/am.schema";
export const useFindUserEmailForms = () => {
  return useForm({
    resolver: zodResolver(FoundSchemaByEmailorUsername),
    defaultValues: {
      text: "",
    },
  });
};
