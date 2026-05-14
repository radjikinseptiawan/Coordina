import AuthChangePasswordTemplate from "@/app/features/auth/change-password/ac.template"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ganti Password"
}

export default async function Page() {
    return <AuthChangePasswordTemplate />
}