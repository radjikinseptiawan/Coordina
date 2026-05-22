import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function getComityHelper(prisma: PrismaService, id: string) {
    try {
        const data = await prisma.accounts.findFirst({
            where: { id: id }
        })

        if (!data) {
            throw new HttpException({
                message: "User not found!",
                httpStatus: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND)
        }


        const user = await prisma.user_Profile.findFirst({
            where: { account_id: data.id },
            include: {
                member_profile_comity: true
            }
        })

        if (!user?.id) {
            throw new HttpException({
                message: "User profile not found!",
                httpStatus: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND)
        }

        const comities = await prisma.member_Profiles_Comities.findMany({
            where: {
                member_id: user.id
            },
            include: {
                comity: true
            }
        })

        return new HttpException({
            message: "Success",
            httpStatus: HttpStatus.OK,
            comities: comities
        }, HttpStatus.OK)
    } catch (e) {
        throw new HttpException({
            message: "Internal server error!",
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            error: e
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

}       