import { Module } from "@nestjs/common";
import { ComityControllers } from "./controllers/comity.controllers";
import { DashboardController } from "./controllers/dashboard.controllers";
import { DashboardService } from "./services/dashboard.service";
import { ComityService } from "./services/comity.service";

@Module({
    imports: [],
    controllers: [ComityControllers, DashboardController],
    providers: [DashboardService, ComityService],
})
export class ComityModule { }