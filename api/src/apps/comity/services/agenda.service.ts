import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgendaPayload } from '../dto/agenda.dto';
import { createAgendaHelper } from 'src/helper/agenda/create-agenda';
import { ShowAgenda } from 'src/helper/agenda/show-agenda';
import { SpesificAgendaHelper } from 'src/helper/agenda/spesifics-agenda';
import { attendanceShowHelper } from 'src/helper/agenda/show-attendance';
import { AbsenceAgenda } from 'src/helper/agenda/absence.agenda';
import { GetAllAgenda } from 'src/helper/agenda/get-all-agenda';
import { UpdateAgendaHelper } from 'src/helper/agenda/update-agenda';

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

  async updateAgenda(params, body) {
    return await UpdateAgendaHelper(this.prisma, params, body);
  }

  async deleteAgenda(params) {
    try {
      const data = await this.prisma.agenda.update({
        where: {
          id: params.id,
        },
        data: {
          is_deleted: true,
        },
      });

      if (!data) {
        throw new HttpException(
          {
            message: 'Failed, data not found!',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Success to delete agenda',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to delete data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllAgenda(params) {
    return await GetAllAgenda(this.prisma, params);
  }

  async getAbsenceAgenda(param, account) {
    return await attendanceShowHelper(this.prisma, param, account);
  }
  async absenceAgenda(body: any, payload, userId) {
    return AbsenceAgenda(payload, this.prisma, body, userId);
  }

  async showAgenda(comityUrl, page, limit, user) {
    return await ShowAgenda(this.prisma, comityUrl, page, limit, user);
  }

  async getSpesifics(id: { organisasi: string; id: string; person }, user) {
    return await SpesificAgendaHelper(this.prisma, id, user);
  }
}
