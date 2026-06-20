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

    return {
      message: 'Success',
      agenda: agenda,
      attendance: attendance,
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
