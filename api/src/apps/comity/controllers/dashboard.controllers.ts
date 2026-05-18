import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Req, UseGuards } from "@nestjs/common";
import { DashboardService } from "../services/dashboard.service";
import { ComityInput } from "../dto/dashboard.dto";
import { JwtAuthGuard } from "src/apps/accounts/auth/guards/auth.guard";
import { GoogleAuthGuard } from "src/apps/accounts/auth/guards/auth.google.guard";

@Controller("/dashboard")
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService,
    ) { }

    @Put()
    @UseGuards(JwtAuthGuard)
    async createLink(@Body() body : any, @Req() req){
        return await this.dashboardService.updateComities(body)
    }

    @Get("comities")
    @UseGuards(JwtAuthGuard)
    async getComities(
        @Req() req
    ) {
        const users = await req.user
        console.log("ini controllers loh rek", users)
        return await this.dashboardService.getComities(users.userId)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createComity(@Body() body, @Req() req) {
        const users = await req.user

        return await this.dashboardService.createComity(body, users.userId)
    }
}