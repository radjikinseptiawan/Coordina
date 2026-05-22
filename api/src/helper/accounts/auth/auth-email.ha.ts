import { HttpException, HttpStatus } from "@nestjs/common"
import * as nodemailer from "nodemailer"
import { verificationMessage, welcomingNewMember } from "./resources/auth-resources"
import { PrismaService } from "src/prisma/prisma.service"

export async function TransferEmailHandler(tcx: PrismaService, email: string, type: "Verification" | "Welcoming") {
    const isEmailExist = await tcx.accounts.findFirst({
        where: { email: email }
    })

    if (!isEmailExist) {
        throw new HttpException({
            message: "Email is not available!",
            status: HttpStatus.BAD_REQUEST,
        }, HttpStatus.BAD_REQUEST)
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.PASSWORD_EMAIL
        }
    })

    if (type === "Verification") {
        const Otp = Math.floor(1000 + Math.random() * 9000)

        await transporter.sendMail({
            from: `"Admin Himatif" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `[Email Validation] - ${isEmailExist.username}`,
            text: "Please validate your email",
            html: verificationMessage(isEmailExist.username, Otp)
        })

        await tcx.accounts_Otp.create({
            data: {
                otp_code: Otp,
                email: email,
                expires_at: new Date(Date.now() + 10 * 60 * 1000)
            }
        })

    } else if (type === "Welcoming") {
        await transporter.sendMail({
            from: `"Admin Himatif" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `[Welcome to Himatif Absency] - ${isEmailExist.username}`,
            text: "Welcome to our Organization",
            html: welcomingNewMember(isEmailExist.username)
        })
    }
    return new HttpException({
        message: "Email is available! we already send your email for validation process",
        status: HttpStatus.OK,
    }, HttpStatus.OK)
}
