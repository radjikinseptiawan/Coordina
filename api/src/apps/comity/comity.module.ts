import { Module } from "@nestjs/common";
import { ComityControllers } from "./controllers/comity.controllers";
import { DashboardController } from "./controllers/dashboard.controllers";
import { DashboardService } from "./services/dashboard.service";
import { ComityService } from "./services/comity.service";
import { AgendaControllers } from "./controllers/agenda.controllers";
import { AgendaServices } from "./services/agenda.service";

@Module({
    imports: [],
    controllers: [ComityControllers, DashboardController, AgendaControllers],
    providers: [DashboardService, ComityService, AgendaServices]
})
export class ComityModule { }