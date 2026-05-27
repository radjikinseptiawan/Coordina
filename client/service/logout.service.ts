"use server"
import axios from "axios"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta/auth`

export const logoutUsers = async()=>{
    await (await cookies()).delete("access_token")
    redirect("/login")
}