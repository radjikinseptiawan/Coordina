import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgendaPayload } from '../dto/agenda.dto';
import { createAgendaHelper } from 'src/helper/agenda/create-agenda';
import { ShowAgenda } from 'src/helper/agenda/show-agenda';
import { SpesificAgendaHelper } from 'src/helper/agenda/spesifics-agenda';
import { attendanceShowHelper } from 'src/helper/agenda/show-attendance';

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

  async getAbsenceAgenda(param, account) {
    return await attendanceShowHelper(this.prisma, param, account);
  }
  async absenceAgenda(body: any, payload, userId) {
    try {
      const [comity, user] = await Promise.all([
        await this.prisma.agenda.findFirst({
          where: {
            comity: {
              urlLink: body.organisasi,
            },
            id: body.id,
          },
        }),
        await this.prisma.member_Profiles_Comities.findFirst({
          where: {
            account_id: userId,
          },
        }),
      ]);

      console.log('ini comity', comity);
      console.log('ini user', user);

      if (!comity) {
        throw new HttpException(
          {
            message: 'Comity not found!',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!user) {
        throw new HttpException(
          {
            message: 'User not found!',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const timeCheck = Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());

      const attendance = await this.prisma.attendance.create({
        data: {
          agenda_id: comity.id,
          method: payload.method,
          proof_attendance: payload.proof_attendance,
          checkin_at: timeCheck,
          status: payload.status,
          user_id: user.id,
        },
      });

      console.log('ini attendance', attendance);

      return new HttpException(
        { message: 'success to get data', data: comity, attendance },
        HttpStatus.OK,
      );
    } catch (e: any) {
      throw new HttpException(
        {
          message: 'Failed to absence!',
          error: e,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async showAgenda(comityUrl, page, limit, user) {
    return await ShowAgenda(this.prisma, comityUrl, page, limit, user);
  }

  async getSpesifics(id: { organisasi: string; id: string; person }, user) {
    return await SpesificAgendaHelper(this.prisma, id, user);
  }
}
