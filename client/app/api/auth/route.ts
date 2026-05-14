"use server"
// Route untuk forgot password

import { serverUrl } from "@/utils/connection";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        const response = await axios.get(`${serverUrl}/v1_beta/accounts/auth/validate?email=${email}`)
        if (!response) {
            return NextResponse.json({
                message: "Failed to send a OTP CODE",
            }, { status: 400 })
        }


        return NextResponse.json({
            message: "OK",
            data: response.data
        }, { status: 200 })
    } catch (e) {
        return NextResponse.json({
            message: "FAILED",
            error: e
        })
    }
}