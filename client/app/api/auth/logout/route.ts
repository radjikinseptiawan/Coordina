import { serverUrl } from "@/utils/connection";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const cookie = await cookies()
        cookie.delete("access_token")

        const response = await axios.delete(`${serverUrl}/v1_beta/accounts/auth/logout`)

        return NextResponse.json({
            message: "OK",
            response: response.data
        }, { status: 200 })
    } catch (e) {
        return NextResponse.json({
            message: "FAILED",
            error: e
        })
    }
}