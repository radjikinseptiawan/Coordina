"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType } from "../al.forms/al.schema";
import { useForm } from "react-hook-form";
export const useAuthLoginForms = () => {
  const data = useForm({
    resolver: zodResolver(LoginSchemaType),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return data;
};
