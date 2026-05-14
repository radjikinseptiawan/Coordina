import { serverUrl } from "@/utils/connection";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json()

        const body = {
            email: payload.email,
            otp: Number(payload.otpCode),
            newPassword: payload.password,
        }

        const res = await axios.post(`${serverUrl}/v1_beta/accounts/auth/change-password?email=${body.email}&otp=${body.otp}`,
            body
        )

        console.log(res)

        if (!res) {
            return NextResponse.json({
                status: 404,
                message: "Gagal mengganti password"
            })
        }

        return NextResponse.json({
            message: "data yg didapat",
            data: res
        })
    } catch (e) {
        return NextResponse.json({
            message: "Internal server error, try again",
            error: e
        })
    }

}