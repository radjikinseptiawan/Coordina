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
    console.log(body);
    console.log('Buatan', createdById);
    const comity = await tcx.comity.findFirst({
      where: {
        urlLink: ComityId,
      },
    });

    if (!comity) {
      throw new HttpException(
        {
          message: 'Failed to get comity',
          comity,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userProfile = await tcx.user_Profile.findFirst({
      where: {
        account_id: createdById,
      },
    });

    if (!userProfile) {
      throw new HttpException(
        {
          message: 'Failed to get userProfile',
          userProfile,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const agenda = await tcx.agenda.create({
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
        lampiran: body.lampiran,
        meetingLink: body.meetingLink,
        created_by_id: userProfile.id,
        comity_id: comity.id,
      },
    });

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

    const members = await tcx.member_Profiles_Comities.findMany({
      where: {
        account_id: userProfile.account_id,
        comity_id: comity.id,
      },
    });

    console.log(members);

    if (members.length > 0) {
      const attendance = members.map((member) => ({
        agenda_id: agenda.id,
        status: body.status,
        checkin_at: body.checkin_at,
        user_id: member.id,
      }));

      await tcx.attendance.createMany({
        data: attendance,
        skipDuplicates: true,
      });
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
