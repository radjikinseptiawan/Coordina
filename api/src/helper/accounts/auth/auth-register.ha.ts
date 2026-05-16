import { HttpException, HttpStatus } from "@nestjs/common";
import { SignUpDto } from "src/apps/accounts/auth/dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import bcrypt from "bcrypt"
import { TransferEmailHandler } from "./auth-email.ha";
export async function RegisterAccountsHandler(
    tcx: PrismaService
    , body: SignUpDto) {
    try {
        const hashPassword = await bcrypt.hash(body.password, 10)

        const data = await tcx.accounts.create({
            data: {
                email: body.email,
                password: hashPassword,
                username: body.username
            }
        })

        if (!data) {
            return {
                data,
                message: "BAD REQUEST",
                code: HttpStatus.BAD_REQUEST
            }
        }

        await tcx.user_Profile.create({
            data:{
                account_id: data.id,
                image: null
            }
        })


        await TransferEmailHandler(tcx, body.email, "Welcoming")

        return {
            data,
            message: "Success Created Accounts",
            code: HttpStatus.OK
        };
    } catch (e) {
        throw new HttpException({
            message: "Internal Server Error",
            detail: e.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}