import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function GetAllAgenda(tcx: PrismaService, params) {
  try {
    const agenda = await tcx.agenda.findMany({
      where: {
        comity: {
          urlLink: params.organisasi,
        },
        is_deleted: false,
      },
    });

    const agendaIds = agenda.map((item) => item.id);
    const totalAgenda = agenda.length;

    if (totalAgenda === 0) {
      return { message: 'Success', agenda: [], attendance: [], percentage: {} };
    }

    const members = await tcx.member_Profiles_Comities.findMany({
      where: {
        comity: {
          urlLink: params.organisasi,
        },
      },
    });

    const attendance = await tcx.attendance.findMany({
      where: {
        agenda_id: {
          in: agendaIds,
        },
      },
      include: {
        agenda: true,
        user: true,
      },
    });

    const totalAllPresent = attendance.filter(
      (item) => item.status == 'PRESENT',
    ).length;

    const payloads = attendance.reduce((acc, items) => {
      const userId = items.user.member_id;

      if (!acc[userId]) {
        acc[userId] = {
          user: items.user,
          present: 0,
          percentage: 0,
        };
      }

      if (items.status === 'PRESENT') {
        acc[userId].present += 1;
      }
      return acc;
    }, {});

    Object.keys(payloads).forEach((userId) => {
      const totalPresent = payloads[userId].present;
      payloads[userId].percentage = (totalPresent / totalAgenda) * 100;
    });

    return {
      message: 'Success',
      agenda: agenda,
      attendance,
      percentage: payloads,
      members,
      score: (totalAllPresent / (totalAgenda * members.length)) * 100,
    };
  } catch (error: any) {
    throw new HttpException(
      {
        message: 'Failed to get all data',
        error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
