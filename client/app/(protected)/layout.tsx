import { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Navbar } from "../_shared/components/Navbar/navbar.builder"
import { Toaster } from "react-hot-toast"
import ProtectedProvider from "@/provider/protected"

export const metadata: Metadata = {
    title: "Welcome"
}

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("access_token")

    if (!token || token === undefined) {
        redirect("/login")
    }

    const base64 = token.value.split(".")[1]
    const user = typeof base64 === "string" ? JSON.parse(Buffer.from(base64, "base64").toString("utf-8")) : redirect("/login")

    return (
        <ProtectedProvider>
            <div className="border-l-2">
                <Toaster/>
                <Navbar photo={user.profileImage} username={user.username} email={user.email} />
                <div className="w-full mt-10 p-10 h-screen">
                    {children}
                </div>
            </div>
        </ProtectedProvider>
    )
}