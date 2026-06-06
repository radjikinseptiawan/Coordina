import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function attendanceShowHelper(tcx: PrismaService, param, account) {
  try {
    const [comity, agenda, person] = await Promise.all([
      await tcx.comity.findFirst({
        where: {
          urlLink: param.organisasi,
        },
      }),

      await tcx.agenda.findFirst({
        where: {
          id: param.id,
        },
        include: {
          user_member_profile: true,
        },
      }),
      await tcx.member_Profiles_Comities.findMany({
        where: {
          account_id: account,
        },
      }),
    ]);

    const user = person.map((item) => item.comity_id);
    if (!user.includes(comity?.id as string)) {
      throw new HttpException(
        {
          message: 'Error! comity not found!',
          comity,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (comity?.id !== agenda?.comity_id) {
      throw new HttpException(
        {
          message: 'Error! agenda not found!',
          comity,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const member = person.map((item) => item.id);
    const attendance = await tcx.attendance.findFirst({
      where: {
        user_id: member[0],
        agenda_id: agenda?.id,
      },
    });
    if (user.includes(attendance?.user_id as string)) {
      throw new HttpException(
        {
          message: 'Error! attendance not found!',
          comity,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return new HttpException(
      {
        message: 'Success get data',
        attendance,
      },
      HttpStatus.OK,
    );
  } catch (err: any) {
    return new HttpException(
      {
        message: 'error',
        error: err.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
