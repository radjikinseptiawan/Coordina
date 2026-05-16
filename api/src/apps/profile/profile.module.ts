import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProfileController } from "./controller/profile.controllers";
import { ProfileService } from "./services/profile.service";

@Module({
    imports: [
        PrismaModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule { }