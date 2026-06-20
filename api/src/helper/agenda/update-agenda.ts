import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function UpdateAgendaHelper(tcx: PrismaService, params, body) {
  try {
    const agenda = await tcx.agenda.update({
      where: {
        id: params.id,
      },
      data: {
        agenda_name: body.agenda_name,
        tanggal_agenda: new Date(body.tanggal_agenda),
        is_online: body.is_online,
        lokasi: body.lokasi,
        lokasi_link: body.link_lokasi,
        start_at: body.start_at,
        end_at: body.end_at,
        room_pass: body.password,
        status_agenda: body.status_agenda,
        note: body.note,
        priority_level: body.priority_level,
        lampiran: body.lampiran,
        meetingLink: body.meetingLink,
      },
    });

    return {
      message: 'Success to update agenda',
      agenda,
    };
  } catch (err) {
    throw new HttpException(
      {
        message: 'Failed to connect server',
        error: err,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
