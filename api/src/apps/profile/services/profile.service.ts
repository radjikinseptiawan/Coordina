import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EditProfileDto } from "../dto/profile.dto";
import { editProfileHelper } from "src/helper/accounts/profile/profile-patch.helper";
import { getProfileHelper } from "src/helper/accounts/profile/profile-get.helper";

@Injectable()
export class ProfileService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getProfile(id: string) {
        return await getProfileHelper(this.prisma, id)
    }

    async editProfile(id: string, body: EditProfileDto, image: Express.Multer.File) {
        return await editProfileHelper(this.prisma, id, body, image)
    }

}
