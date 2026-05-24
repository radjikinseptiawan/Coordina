import { AuthLoginTemplate } from "@/features/auth/login/al.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  return <AuthLoginTemplate />;
}
