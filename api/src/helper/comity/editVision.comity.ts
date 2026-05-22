import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function editVisionHelper(tcx: PrismaService, url: string, body:any){
            try{
            const comity = await tcx.comity.findFirst({
                where:{
                    urlLink: url
                }
            })

            const comityVision = await tcx.comity_Vision.findFirst({
                where:{
                    comity_id: comity?.id
                }
            })

            if(!comity){
                return new HttpException({
                    message: "data not found!",
                    data: comity
                }, HttpStatus.NOT_FOUND)
            }


            const request = await tcx.comity_Vision.update({
                where:{
                    id : comityVision?.id
                },
                data:{
                    vision: body.visi
                }
            })

            return new HttpException({
                message: "Success update vision",
                oldData: comityVision,
                newData: request,
            }, HttpStatus.ACCEPTED)

        }catch(e){
            throw new HttpException({
                message:"Error",
                error: e
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
}