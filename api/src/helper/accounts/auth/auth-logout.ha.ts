import { HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function logoutHandler(tcx: PrismaService, id: string) {
    try {
        const data = await tcx.accounts.update({
            where: {
                id: id
            },
            data: {
                refresh_token: null
            }
        })

        if (!data) {
            return {
                message: "BAD REQUEST",
                code: HttpStatus.BAD_REQUEST
            }
        }

        return {
            data,
            message: "Success Sign Out",
            code: HttpStatus.OK
        }
    } catch (e) {
        return {
            message: "BAD REQUEST",
            code: HttpStatus.BAD_REQUEST
        }
    }
}