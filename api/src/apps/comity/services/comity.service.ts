import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ComityVision } from "../dto/dashboard.dto";
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


    async editComityMission(){
        try{
            
        }catch(e){
            throw new HttpException({
                message: "Error",
                error: e
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}