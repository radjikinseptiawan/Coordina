import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EditProfileDto } from "../dto/profile.dto";

@Injectable()
export class ProfileService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getProfile(id: string) {
        try {
            const data = await this.prisma.user_Profile.findUnique({
                where: {
                    account_id: id,
                },
                include:{
                    account: true,
                }
            })

            return new HttpException({
                message: "Profile found",
                status: HttpStatus.OK,
                data
            }, HttpStatus.OK)
        } catch (e : any) {
            return new HttpException({
                message: "Internal Server Error",
                detail: e.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async editProfile(id: string, body: EditProfileDto, image: Express.Multer.File) {
        try {
            const data = await this.prisma.user_Profile.update({
                where: {
                    account_id: id,
                },
                data: {
                    fullname: body.fullname,
                    image: image.filename,
                    updated_at: new Date()
                }
            })

            if (!data) {
                return new HttpException({
                    message: "Profile not found",
                    status: HttpStatus.NOT_FOUND,
                }, HttpStatus.NOT_FOUND)
            }

            if(body.email || body.username){
                const updateAccounts =  await this.prisma.accounts.update({
                    where: {
                        id: id
                    },
                    data:{
                        username: body.username,
                        email: body.email,
                        profileImage: image.filename,
                        updated_at: new Date()
                    }
                })
            }


            return new HttpException({
                message: "Profile Updated",
                status: HttpStatus.OK,
                data
            }, HttpStatus.OK)
        } catch (error :any) {
            return new HttpException({
                message: "Internal Server Error",
                detail: error.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
