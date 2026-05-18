import UserProfileTemplate from "@/app/features/profile/p.template"
import { Metadata } from "next"

export const metadata: Metadata = {
    title : "Profile"
}
export default async function Page(){
    return <UserProfileTemplate/>
}