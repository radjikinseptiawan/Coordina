import { Body, Controller, Delete, Get, Patch, Post, Req, UseInterceptors } from "@nestjs/common";
import { LogginInterceptors } from "src/interceptors/logging.interceptors";
import { AgendaServices } from "../services/agenda.service";

@UseInterceptors(LogginInterceptors)
@Controller('/v1_beta/:organisasi/comity/agenda')
export class AgendaControllers{
    constructor(
        private readonly AgendaService: AgendaServices
    ){}

    @Post('create')
    async createAgenda(@Body() body, comityId, @Req() request){
        const user = await request.user
        return this.AgendaService.createAgenda(body, comityId, user.userId)
    }

    @Get('show')
    async showAgenda(){

    }

    @Get('show-detail')
    async showAgendaDetail(){

    }

    @Patch('update-agenda')
    async updateAgenda(){

    }

    @Delete('delete')
    async deleteAgenda(){

    }
}