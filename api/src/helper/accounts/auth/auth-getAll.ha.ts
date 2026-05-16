import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function getAllAccountsHandler(tcx: PrismaService) {
    try {
        const datas = await tcx.accounts.findMany({
            select: {
                email: true
            }
        })

        if (datas.length === 0) {
            return {
                message: "Data is empty!",
                code: HttpStatus.OK,
                data: []
            }
        }

        return {
            message: "success retrieved",
            code: HttpStatus.OK,
            data: datas
        }
    } catch (e: any) {
        throw new HttpException({
            message: e.message || "Something went wrong",
            code: HttpStatus.INTERNAL_SERVER_ERROR,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

}