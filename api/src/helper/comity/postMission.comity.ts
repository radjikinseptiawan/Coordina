import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

export async function addMissionComity(tcx: PrismaService, url: string, body : any){
        try{
            console.log(body)
            const comity = await tcx.comity.findFirst({
                where:{
                    urlLink: url
                },
                include:{
                    missions: true,
                    visions: true
                }
            })

            if(!comity){
                throw new HttpException({
                    message: "NOT FOUND!"
                },HttpStatus.NOT_FOUND)
            }

            const missions = body.mission.map((item)=>({
                comity_id : comity.id,
                mission: item.mission
            }))

            const request = await tcx.comity_Mission.createMany({
                data: missions
            })

            
            return new HttpException({
                message: "Success to find comity",
                comity: comity,
                data: request
            }, HttpStatus.ACCEPTED)

        }catch(e){
            throw new HttpException({
                error: e,
                message: "Error"
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
}