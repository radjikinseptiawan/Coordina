import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getAuthUser = async()=>{
    const cookiesStore = await cookies()
    const token = cookiesStore.get("access_token")

    if (!token || token === undefined) {
        redirect("/login")
    }

    const base64 = token.value.split(".")[1]
    const user = typeof base64 === "string" ? JSON.parse(Buffer.from(base64, "base64").toString("utf-8")) : redirect("/login")
    return user
}
