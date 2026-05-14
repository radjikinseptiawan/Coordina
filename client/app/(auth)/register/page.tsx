import AuthRegisterTemplate from "@/app/features/auth/register/ar.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftar"
}

export default async function Page() {
    return <AuthRegisterTemplate />
}