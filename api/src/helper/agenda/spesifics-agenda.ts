import { HttpException, HttpStatus } from '@nestjs/common';

export async function SpesificAgendaHelper(tcx, id, user) {
  try {
    const [comity, agenda, person] = await Promise.all([
      await tcx.comity.findFirst({
        where: {
          urlLink: id.organisasi,
        },
      }),
      await tcx.agenda.findFirst({
        where: {
          id: id.id,
        },
        include: {
          user_member_profile: true,
        },
      }),
      await tcx.member_Profiles_Comities.findMany({
        where: {
          account_id: user.userId,
        },
      }),
    ]);

    const userId = person.map((item) => item.comity_id);
    if (!userId.includes(comity.id as string)) {
      throw new HttpException(
        {
          message: 'Failed, Not Found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (comity?.id !== agenda?.comity_id) {
      throw new HttpException(
        {
          message: 'Failed, Not Found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return new HttpException(
      {
        message: 'Success',
        agenda,
      },
      HttpStatus.ACCEPTED,
    );
  } catch (e) {
    return new HttpException(
      {
        message: 'Failed to get spesicifics',
        error: e,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
