import { HttpException, HttpStatus } from "@nestjs/common"
import { SignInDto } from "src/apps/accounts/auth/dto/auth.dto"
import { PrismaService } from "src/prisma/prisma.service"
import bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
export async function userSignInHandler(body: SignInDto, tcx: PrismaService, jwt: JwtService) {
    try {
        const user = await tcx.accounts.findUnique({
            where: {
                email: body.email
            }
        })

        if (!user?.email) {
            throw new HttpException({
                message: "User not found",
            }, HttpStatus.BAD_REQUEST )
        }

        const verifyPassword = await bcrypt.compare(body.password, user.password)

        if (!verifyPassword) {
            throw new HttpException({
                message: "Wrong password!",
            }, HttpStatus.BAD_REQUEST)
        }

        const payload = { id: user.id, username: user.username, email: user.email }

        const accessToken = jwt.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: "24h" })
        const refreshToken = jwt.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: "7d" })

        await tcx.accounts.update({
            where: {
                id: user.id
            },
            data: {
                refresh_token: refreshToken
            }
        })

        return {
            accessToken,
            refreshToken,
            message: "User logged in successfully",
            status: HttpStatus.OK,
        }

    } catch (e: any) {
        throw new HttpException({
            message: e.message || "Something went wrong",
            code: HttpStatus.INTERNAL_SERVER_ERROR,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}