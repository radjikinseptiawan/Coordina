import { Body, Controller, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProfileService } from "../services/profile.service";
import { JwtAuthGuard } from "src/apps/accounts/auth/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { PROFILE_EDIT_CONFIG } from "src/helper/accounts/profile/profile-edit";
import { LogginInterceptors } from "src/interceptors/logging.interceptors";

@UseInterceptors(LogginInterceptors)
@Controller("v1_beta/:account_id/profile")
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getProfile(@Param("account_id") account_id: string) {
        return await this.profileService.getProfile(account_id)
    }

    @Patch()
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage(PROFILE_EDIT_CONFIG)
    }))
    @UseGuards(JwtAuthGuard)
    async editProfile(@UploadedFile() image: Express.Multer.File,
        @Param("account_id") account_id: string,
        @Body() body) {
        return await this.profileService.editProfile(account_id, body, image)
    }
}
