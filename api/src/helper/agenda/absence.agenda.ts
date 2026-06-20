import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function AbsenceAgenda(payload, tcx: PrismaService, body, userId) {
  try {
    const [agenda, user] = await Promise.all([
      await tcx.agenda.findFirst({
        where: {
          comity: {
            urlLink: body.organisasi,
          },
          id: body.id,
        },
      }),
      await tcx.member_Profiles_Comities.findFirst({
        where: {
          account_id: userId,
        },
      }),
    ]);

    if (!user) {
      throw new HttpException(
        {
          message: 'User not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!agenda) {
      throw new HttpException(
        {
          message: 'Agenda not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (agenda.status_agenda != 'ON_GOING') {
      throw new HttpException(
        {
          message: 'Agenda status must been on going!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const timeCheck = Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());

    const attendance = await tcx.attendance.update({
      where: {
        agenda_id_user_id: {
          agenda_id: agenda.id,
          user_id: user.id,
        },
      },
      data: {
        method: payload.method,
        proof_attendance: payload.proof_attendance,
        checkin_at: timeCheck,
        status: payload.status,
      },
    });

    return new HttpException(
      { message: 'success to get data', data: agenda, attendance },
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
