import AuthForgotPasswordTemplate from "@/features/auth/forgot-password/af.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function Page() {
  return <AuthForgotPasswordTemplate />;
}
