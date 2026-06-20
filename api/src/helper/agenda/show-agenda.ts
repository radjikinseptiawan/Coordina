import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function ShowAgenda(
  tcx: PrismaService,
  comityUrl,
  page: number = 1,
  limit: number = 10,
  user: any,
) {
  try {
    const [person, comity] = await Promise.all([
      await tcx.member_Profiles_Comities.findMany({
        where: {
          account_id: user.userId,
        },
      }),
      await tcx.comity.findFirst({
        where: {
          urlLink: comityUrl,
        },
      }),
    ]);

    const users = person.map((item) => item.comity_id);
    if (!users.includes(comity?.id as string)) {
      throw new HttpException(
        {
          message: 'You are not a member of this organization',
          comity,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!comity) {
      throw new HttpException(
        {
          message: 'Failed to show agenda',
          comity,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const skip = (page - 1) * limit;

    const [agenda, totalItems] = await Promise.all([
      tcx.agenda.findMany({
        orderBy: {
          tanggal_agenda: 'desc',
        },
        where: {
          comity_id: comity.id,
          is_deleted: false,
        },
        skip: skip,
        take: limit,
      }),
      tcx.agenda.count({
        where: {
          comity_id: comity.id,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return new HttpException(
      {
        message: 'Success get data',
        data: agenda,
        meta: {
          totalItems,
          totalPages,
          currentPage: page,
          limit,
        },
      },
      HttpStatus.OK,
    );
  } catch (e: any) {
    throw new HttpException(
      {
        message: 'Error!',
        error: e.message,
        detail: e,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
