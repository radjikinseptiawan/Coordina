import { AuthRegisterTemplate } from "@/features/auth/register/ar.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default async function Page() {
  return <AuthRegisterTemplate />;
}
