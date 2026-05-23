import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ComityMission, ComityVision } from "../dto/dashboard.dto";
import { addMissionComity } from "src/helper/comity/postMission.comity";
import { addVisionHelper } from "src/helper/comity/postVision.comity";
import { GetComityHelper } from "src/helper/comity/getComity.comiy";
import { editVisionHelper } from "src/helper/comity/editVision.comity";

@Injectable()
export class ComityService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getComity(url: string) {
        return await GetComityHelper(this.prisma,url)
    }


    async createComityMission(url,body){
        return await addMissionComity(this.prisma, url, body)
    }


    async createComityVision(url: string,body: ComityVision) {
        return await addVisionHelper(this.prisma, url,body)
    }


    async editComityVision(url: string, body: ComityVision){
        return await editVisionHelper(this.prisma, url, body)
    }


    async editComityMission(body : ComityMission){
        try{
            const data = await this.prisma.comity_Mission.findFirst({
                where: {
                    id: body.id
                },
            })
         
            

            if(!data){
                return new HttpException({
                    message: "Error, Bad Request!",
                    data
                }, HttpStatus.BAD_REQUEST)
            }

            const request = await this.prisma.comity_Mission.update({
                where: {
                    id: body.id
                },
                data: {
                    mission: body.mission
                }
            })


            return new HttpException({
                message: "Success update Mission",
                newData: request,
                oldData: data
            }, HttpStatus.OK)
        }catch(e){
            throw new HttpException({
                message: "Error",
                error: e
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteComityMission(body){
        try{
            const data = await this.prisma.comity_Mission.delete({
                where:{
                    id: body.id
                }
            })

            if(!data){
                return new HttpException({
                    message: "NOT FOUND!",
                    data
                }, HttpStatus.NOT_FOUND)
            }

            return new HttpException({
                message: "SUCCESS",
                data
            }, HttpStatus.OK)
        }catch(e){
            throw new HttpException({
                message: "Error",
                error:e
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}