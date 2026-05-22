import { HttpException, HttpStatus, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ComityInput } from "../dto/dashboard.dto";
import { createComityHandler } from "src/helper/dashboard/dashboard-create.comity";
import { generateLinkHelper } from "src/helper/dashboard/dashboard-generate.link";
import { getComityHelper } from "src/helper/dashboard/dashboard-get.comity";

@Injectable()
export class DashboardService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async updateComities(body: any) {
        return await generateLinkHelper(this.prisma, body)
    }


    async getComities(id: string) {
        return await getComityHelper(this.prisma, id)
    }

    async createComity(body: ComityInput, userId: string) {
        return await createComityHandler(this.prisma, body, userId)
    }
}