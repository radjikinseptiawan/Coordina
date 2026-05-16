import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInGoogleDto } from "../dto/auth.dto";

@Injectable()
export class AuthGoogleService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly JwtService: JwtService
    ) { }

    async generateAccessToken(body: SignInGoogleDto) {
        let accounts = await this.prisma.accounts.findUnique({
            where: {
                email: body.email
            }
        })

        if (!accounts) {
            throw new HttpException({
                message: "Email not registerd!",
                status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST)
        }

        if (!accounts?.username || !accounts?.profileImage) {
            accounts = await this.prisma.accounts.update({
                where: {
                    email: body.email
                },
                data: {
                    profileImage: body.profileImage,
                    username: body.username,
                    updated_at: new Date()
                }
            })
        }

        const payload = {
            id: accounts.id,
            email: accounts?.email as string,
            username: accounts?.username as string,
            profileImage: accounts?.profileImage as string
        }


        if (accounts) {
            await this.prisma.user_Profile.update({
                where: {
                    account_id: accounts?.id
                },
                data: {
                    image: body.profileImage,
                    account_id: accounts?.id,
                }
            })
        }

        const token = await this.JwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: "1d"
        })

        await this.prisma.accounts.update({
            where: {
                email: body.email
            },
            data: {
                updated_at: new Date(),
                refresh_token: token
            }
        })
        return token
    }
}