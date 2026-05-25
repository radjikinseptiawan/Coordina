import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import * as bcrypt from "bcrypt"
import { ChangePasswordDto } from "src/apps/accounts/auth/dto/auth.dto"

export async function OtpValidationHandler(tcx: PrismaService, email: string, otp: string | number) {
    try {
        const verifyOtp = await tcx.accounts_Otp.findFirst({
            where: {
                email: email,
                otp_code: Number(otp),
            }
        })


        if (!verifyOtp) {
            throw new HttpException({
                message: "Otp is invalid or expired!",
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST)
        }

        await tcx.accounts_Otp.update({
            where: {
                id: verifyOtp.id
            },
            data: {
                is_used: true,
                used_at: new Date()
            }
        })

        return {
            message: "Otp is valid! Now you can change your password.",
            status: HttpStatus.OK,
            data: {
                email: email,
                otp_code: otp
            }
        }

    } catch (err : any) {
        if (err instanceof HttpException) {
            throw err
        }

        throw new HttpException({
            message: "Internal Server Error!",
            error: err.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}