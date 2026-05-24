"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchemaType } from "../arp.forms/arp.schema";

export const useResetPasswordForm = () => {
  return useForm({
    resolver: zodResolver(ResetPasswordSchemaType),
    defaultValues: {
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });
};
