import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgendaPayload } from '../dto/agenda.dto';
import { createAgendaHelper } from 'src/helper/agenda/create-agenda';
import { ShowAgenda } from 'src/helper/agenda/show-agenda';

@Injectable()
export class AgendaServices {
  constructor(private readonly prisma: PrismaService) {}

  async createAgenda(
    body: AgendaPayload,
    ComityId: string,
    createdById: string,
  ) {
    return await createAgendaHelper(body, ComityId, this.prisma, createdById);
  }

  async showAgenda(comityUrl) {
    return await ShowAgenda(this.prisma, comityUrl);
  }
}
