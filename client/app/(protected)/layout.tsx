import { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Navbar } from "../_shared/components/Navbar/navbar.builder"
import { Toaster } from "react-hot-toast"
import ProtectedProvider from "@/provider/protected"
import { getAuthUser } from "../_shared/common/hooks/auth"

export const metadata: Metadata = {
    title: "Welcome"
}

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const user = await getAuthUser()
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