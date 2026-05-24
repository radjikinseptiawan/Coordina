import AuthResetPasswordTemplate from "@/features/auth/reset-password/arp.template";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface PageProps {
  searchParams: {
    email?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const email = searchParams.email;
  if (!email) {
    redirect("/forgot-password");
  }
  return <AuthResetPasswordTemplate />;
}
