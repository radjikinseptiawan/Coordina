import { HttpException, HttpStatus } from '@nestjs/common';
import { AgendaPayload } from 'src/apps/comity/dto/agenda.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export async function createAgendaHelper(
  body: AgendaPayload,
  ComityId: string,
  tcx: PrismaService,
  createdById: string,
) {
  try {
    const [comity, user] = await Promise.all([
      await tcx.comity.findFirst({
        where: { urlLink: ComityId },
      }),
      await tcx.user_Profile.findFirst({
        where: {
          account_id: createdById,
        },
      }),
    ]);

    if (!comity) {
      throw new HttpException(
        {
          message: 'Failed to get comity',
          comity,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user) {
      throw new HttpException(
        {
          message: 'Failed to get userProfile',
          user,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const [agenda, members] = await Promise.all([
      await tcx.agenda.create({
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
          potential_level: body.priority_level,
          lampiran: body.lampiran,
          meetingLink: body.meetingLink,
          created_by_id: user.id,
          comity_id: comity.id,
        },
      }),
      await tcx.member_Profiles_Comities.findFirst({
        where: {
          account_id: user.account_id,
          comity_id: comity.id,
        },
        include: {
          comity: true,
        },
      }),
    ]);

    if (agenda.comity_id !== members?.comity_id) {
      throw new HttpException(
        {
          message: 'Something wrong!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!agenda) {
      throw new HttpException(
        {
          message: 'Unknwon Error!',
          detail: 'Failed to create agenda',
          data: agenda,
        },
        HttpStatus.AMBIGUOUS,
      );
    }

    return new HttpException(
      {
        message: 'Success to create agenda',
        detail: 'agenda has been created!',
        data: agenda,
      },
      HttpStatus.CREATED,
    );
  } catch (e) {
    console.error(e);
    throw new HttpException(
      {
        message: e,
        error: e,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
