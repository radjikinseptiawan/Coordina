import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function getMembesHelper(
  param,
  page,
  limit,
  tcx: PrismaService,
  user,
) {
  try {
    const [person, comity] = await Promise.all([
      tcx.member_Profiles_Comities.findMany({
        where: {
          account_id: user,
        },
      }),
      tcx.comity.findFirst({
        where: {
          urlLink: param.organisasi,
        },
      }),
    ]);

    if (!comity) {
      throw new HttpException(
        {
          message: 'Failed!, organizations not found!',
          comity,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const users = person.map((item) => item.comity_id);
    if (!users.includes(comity?.id as string)) {
      throw new HttpException(
        {
          message: 'Your are not a member of this organizations',
          comity,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const skip = (page - 1) * limit;

    const [members, membersCount] = await Promise.all([
      tcx.member_Profiles_Comities.findMany({
        where: {
          comity_id: comity?.id,
        },
        include: {
          member: true,
          account: true,
          role: true,
        },
        skip: skip,
        take: Number(limit),
      }),
      tcx.member_Profiles_Comities.count({
        where: {
          comity_id: comity?.id,
        },
      }),
    ]);

    const totalPages = Math.ceil(membersCount / limit);

    console.log(members);
    return new HttpException(
      {
        message: 'Success get members',
        data: members,
        meta: {
          totalPages,
          membersCount,
          currentPage: page,
          limit,
        },
      },
      HttpStatus.OK,
    );
  } catch (e: any) {
    throw new HttpException(
      {
        message: 'Failed to fetch members',
        error: e.message,
        detail: e.detail,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
