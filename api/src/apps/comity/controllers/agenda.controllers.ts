import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LogginInterceptors } from 'src/interceptors/logging.interceptors';
import { AgendaServices } from '../services/agenda.service';
import { JwtAuthGuard } from 'src/apps/accounts/auth/guards/auth.guard';

@UseInterceptors(LogginInterceptors)
@Controller('/v1_beta/:organisasi/comity/agenda')
export class AgendaControllers {
  constructor(private readonly AgendaService: AgendaServices) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createAgenda(@Body() body, @Param() comityId, @Req() request) {
    const user = await request.user;
    return this.AgendaService.createAgenda(
      body,
      comityId.organisasi,
      user.userId,
    );
  }

  @Get('show')
  async showAgenda(@Param() comityId) {
    return this.AgendaService.showAgenda(comityId.organisasi);
  }

  @Get('show-detail')
  async showAgendaDetail() {}

  @Patch('update-agenda')
  async updateAgenda() {}

  @Delete('delete')
  async deleteAgenda() {}
}
