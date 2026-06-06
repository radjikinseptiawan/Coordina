import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function getInviteUser(tcx: PrismaService, search: string) {
  try {
    const data = await tcx.accounts.findMany({
      where: {
        OR: [{ username: search }, { email: search }],
      },
      include: {
        user_profile: true,
      },
    });

    if (data.length === 0) {
      throw new HttpException(
        {
          message: 'Username or email cant be found!',
          data: data,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return new HttpException(
      {
        message: 'Success to get data',
        data,
      },
      HttpStatus.OK,
    );
  } catch (e: any) {
    throw new HttpException(
      {
        message: 'Faild to get data',
        error: e,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
