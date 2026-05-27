import { HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export async function GetComityHelper(tcx : PrismaService, url){
    try{
            const getComity = await tcx.comity.findFirst({
                where: {
                    urlLink: url
                }
            })
    
    
            const vision = await tcx.comity_Vision.findFirst({
                where: {
                    comity_id: getComity?.id
                }
            })
            const mission = await tcx.comity_Mission.findMany({
                where: {
                    comity_id: getComity?.id
                }
            })
    
            return new HttpException({
                data: getComity,
                mission,
                vision,
                message: "Success",
                httpStatus: HttpStatus.OK
            }, HttpStatus.OK)
    
            }catch(e){
                throw new HttpException({
                    message: "Error",
                    error: e
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        
}