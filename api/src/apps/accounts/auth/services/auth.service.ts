import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException, Query, Request } from "@nestjs/common";
import { ChangePasswordDto, SignInDto, SignUpDto } from "../dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterAccountsHandler as registerAccountsHandler } from "src/helper/accounts/auth/auth-register.ha";
import { getAllAccountsHandler } from "src/helper/accounts/auth/auth-getAll.ha";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt"
import { userSignInHandler } from "src/helper/accounts/auth/auth-login.ha";
import { getSpesificAccountsHandler } from "src/helper/accounts/auth/auth-spesific.account";
import { TransferEmailHandler } from "src/helper/accounts/auth/auth-email.ha";
import { logoutHandler } from "src/helper/accounts/auth/auth-logout.ha";
import { OtpValidationHandler } from "src/helper/accounts/auth/auth-otp.validation";
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async getAccounts() {
        return await getAllAccountsHandler(this.prisma)
    }

    async getSpesificAccounts(id: string) {
        return await getSpesificAccountsHandler(id, this.prisma)
    }

    async signUp(body: SignUpDto) {
        return await registerAccountsHandler(this.prisma, body)
    }

    async signIn(body: SignInDto) {
        return await userSignInHandler(body, this.prisma, this.jwtService)
    }

    async getOtp(email: string) {
        await TransferEmailHandler(this.prisma, email, "Verification")

        return {
            message: "Otp is has been send to your email.",
            status: HttpStatus.OK,
        }
    }

    async changePassword(email: string, otp: string, body: ChangePasswordDto) {
        await OtpValidationHandler(this.prisma, email, otp)
        const hashPassword = await bcrypt.hash(body.newPassword, 10)
        return await this.prisma.accounts.update({
            where: {
                email: email
            },
            data: {
                password: hashPassword,
                updated_at: new Date()
            }
        })
    }

    async signOut(id: string) {
        return await logoutHandler(this.prisma, id)
    }
}