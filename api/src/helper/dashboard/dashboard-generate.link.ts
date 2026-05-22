import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function generateLinkHelper(prisma: PrismaService, body) {
    try {

        const data = await prisma.comity.update({
            where: {
                id: body.id
            },
            data: {
                urlLink: body.urlLink
            }
        })

        return new HttpException({
            message: "Link generated!",
            httpStatus: HttpStatus.OK,
            data
        }, HttpStatus.OK)
    } catch (e) {
        throw new HttpException({
            message: "Internal server error!",
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            error: e
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

}