import { serverUrl } from "@/utils/connection";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import RenderResult from "next/dist/server/render-result";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        const payload = {
            comity_area_of_operational: data.comity_area_of_operational,
            comity_city_of_operational: data.comity_city_of_operational,
            comity_name: data.comity_name,
            comity_short_name: data.comity_short_name,
            comity_background: data.comity_background,
            comity_created_date: data.comity_created_date,
        }

        const token = await cookies()
        const tokenStored = await token.get("access_token")
        const response = await axios.post(`${serverUrl}/dashboard`, payload, { headers: { "Content-Type": "application/json", Cookie: `access_token=${tokenStored?.value}` } })

        const result = response.data

        return NextResponse.json({ message: "Data berhasil diterima", data: result }, { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: "Data gagal diterima", error: e }, { status: 500 })
    }
}

export async function PUT(req: NextRequest){
    try{
        const body = await req.json()

        const token = await cookies()
        const tokenStored : any = await token.get("access_token")?.value

        const response = await axios.put(`${serverUrl}/dashboard`, body, {
            headers: {
                "Content-Type" : "application/json",
                Cookie: `access_token=${tokenStored}`
            }
        })

        return NextResponse.json({
            response
        })
    }catch(e){
        return NextResponse.json({
            message: "Gagal Memperbarui data!"
        })
    }
}

export async function GET(req: NextRequest) {
    try {
        const token = await cookies()
        const tokenStored = await token.get("access_token")

        const response = await axios.get(`${serverUrl}/dashboard/comities`, { headers: { Cookie: `access_token=${tokenStored?.value}` } })
        const result = response.data
        return NextResponse.json({ message: "Data berhasil diterima", data: result }, { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: "Data gagal diterima", error: e }, { status: 500 })
    }
}