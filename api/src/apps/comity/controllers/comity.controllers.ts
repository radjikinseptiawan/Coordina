import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ComityService } from "../services/comity.service";
import { LogginInterceptors } from "src/interceptors/logging.interceptors";

@UseInterceptors(LogginInterceptors)
@Controller("v1_beta/:organisasi/comity")
export class ComityControllers {
    constructor(
        private readonly comityService: ComityService,
    ) { }

    @Get()
    async getComity(@Param("organisasi") url: string) {
        return this.comityService.getComity(url)
    }

    @Post("vision")
    async addVision(@Param("organisasi") url : string,@Body() body){
        return this.comityService.createComityVision(url,body)
    }


    @Post("mission")
    async addMission(@Param("organisasi") url: string, @Body() body){
        return this.comityService.createComityMission(url, body)
    }

    @Put("vision")
    async updateVision(@Param("organisasi") url, @Body() body){
        return this.comityService.editComityVision(url, body)
    }

    @Put("mission")
    async updateMission(@Body() body){
        return this.comityService.editComityMission(body)
    }

    @Delete("mission")
    async deleteMission(@Body() body){
        return this.comityService.deleteComityMission(body)
    }
}