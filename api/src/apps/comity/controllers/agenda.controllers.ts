import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  @UseGuards(JwtAuthGuard)
  async showAgenda(
    @Req() request,
    @Param() comityId,
    @Query(
      'page',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    page: number = 1,
    @Query(
      'limit',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    limit: number = 10,
  ) {
    const user = await request.user;
    return this.AgendaService.showAgenda(
      comityId.organisasi,
      page,
      limit,
      user,
    );
  }

  @Get('get-attendance-detail/:id')
  @UseGuards(JwtAuthGuard)
  async getAttendanceDetail(@Param() param, @Req() req) {
    const user = await req.user;
    console.log('controllers : ', user);
    return this.AgendaService.getAbsenceAgenda(param, user.userId);
  }

  @Get('get-spesific/:id')
  @UseGuards(JwtAuthGuard)
  async getSpesific(@Param() body, @Req() req) {
    const user = await req.user;
    return this.AgendaService.getSpesifics(body, user);
  }

  @Post('attendance/:id')
  @UseGuards(JwtAuthGuard)
  async attendance(@Param() body, @Body() payload, @Req() req) {
    const user = await req.user;
    console.log(payload, user);
    return this.AgendaService.absenceAgenda(body, payload, user.userId);
  }
  @Patch('update-agenda')
  async updateAgenda() {}

  @Delete('delete')
  async deleteAgenda() {}
}
