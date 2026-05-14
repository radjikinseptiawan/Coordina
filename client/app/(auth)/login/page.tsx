import AuthLoginTemplate from "@/app/features/auth/login/al.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Masuk"
}

export default async function Page() {
    return <AuthLoginTemplate />
}