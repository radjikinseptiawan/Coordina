import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function addVisionHelper(tcx:PrismaService, url: string, body: any){
    try {
            const comity = await tcx.comity.findFirst({
                where: {
                    urlLink: url
                },
            })

            if (!comity) {
                throw new HttpException({
                    message: "Comity not found",
                    httpStatus: HttpStatus.NOT_FOUND,
                    error: "Comity not found"
                }, HttpStatus.NOT_FOUND)
            }

            const request = await tcx.comity_Vision.create({
                data:{
                    comity_id: comity.id,
                    vision: body.visi
                }
            })


            return new HttpException({
                message: "Success to find comity",
                comity: comity,
                data: request
            }, HttpStatus.ACCEPTED)
        } catch (e) {
            throw new HttpException({
                message: "Internal server error",
                httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
                error: e
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
}