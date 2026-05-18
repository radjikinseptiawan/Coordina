import { serverUrl } from "@/utils/connection"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest){
    try{
        const data = await req.formData()
        console.log("Hasil put dari frontend",data)


        const username = data.get("username")
        const fullname = data.get("fullname")
        const email = data.get("email")
        const photo = data.get("image")

        
        const payload = {
            username,
            fullname,
            email,
            photo
        }

        const cookie = await cookies()
        const token : any= cookie.get("access_token")?.value

        const user : any= jwtDecode(token)

        const res = await axios.put(`${serverUrl}/v1_beta/${user.id}/profile`,payload,{
            headers: {
                Cookie: `access_token=${token}`
            }
        })

        const result = res.data.response.data
        return NextResponse.json({
            message: "Data yg diterima backend Next",
            result
        })
    }catch(e){
        console.error(e)
        return NextResponse.json({
            error: e
        })
    }
}

export async function GET(){
    try{
        const cookie = await cookies()
        const token = cookie.get("access_token")?.value

        if(!token){
            return NextResponse.json({
                message: "Unauthorized",
                code: 403
            },{status:403})
        }

        const user : any = jwtDecode(token)

        const data = await axios.get(`${serverUrl}/v1_beta/${user.id}/profile`,{
            headers: {
                Cookie: `access_token=${token}`
            }

        })
        const response = data.data.response.data
        return NextResponse.json({
            response
        })
    }catch(e){
        console.error(e)
        return NextResponse.json({
            message: "Internal Server Error",
            error: e
        })
    }
}