import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function getProfileHelper(prisma: PrismaService, id: string) {
    try {
        const data = await prisma.user_Profile.findUnique({
            where: {
                account_id: id,
            },
            include: {
                account: true,
            }
        })

        return new HttpException({
            message: "Profile found",
            status: HttpStatus.OK,
            data
        }, HttpStatus.OK)
    } catch (e: any) {
        return new HttpException({
            message: "Internal Server Error",
            detail: e.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}