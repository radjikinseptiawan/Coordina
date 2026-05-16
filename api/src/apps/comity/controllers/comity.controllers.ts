import { Controller, Get } from "@nestjs/common";
import { ComityService } from "../services/comity.service";

@Controller(":organisasi/")
export class ComityControllers {
    constructor(
        private readonly comityService: ComityService,
    ) { }

    @Get()
    async getComity() {
        return "Hello"
    }
}