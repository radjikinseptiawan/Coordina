import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ComityService } from "../services/comity.service";

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
}