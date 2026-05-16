import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProfileService } from "../services/profile.service";

@Controller("v1_beta/:account_id/profile")
export class ProfileController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly profileService: ProfileService
    ) { }

    @Get()
    async getProfile(@Param("account_id") account_id: string) {
        return await this.profileService.getProfile(account_id)
    }

    @Put()
    async editProfile(@Param("account_id") account_id: string, @Body() body) {
        return await this.profileService.editProfile(account_id, body)
    }
}
