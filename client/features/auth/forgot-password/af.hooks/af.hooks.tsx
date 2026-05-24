import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchemaType } from "../af.forms/af.schema";

export const useAuthResetPasswordForm = () => {
  return useForm({
    resolver: zodResolver(ForgotPasswordSchemaType),
    defaultValues: {
      email: "",
    },
  });
};
