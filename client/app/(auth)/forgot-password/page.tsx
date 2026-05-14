import AuthForgotPasswordTemplate from "@/app/features/auth/forgot-password/af.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lupa Password"
}

export default async function Page() {
    return <AuthForgotPasswordTemplate />
}