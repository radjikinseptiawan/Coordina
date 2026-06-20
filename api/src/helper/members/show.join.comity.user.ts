import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function ShowJoinComity(tcx: PrismaService, param) {
  try {
    const data = await tcx.comity_Member_Request.findMany({
      where: {
        comity: {
          urlLink: param.organisasi,
        },
        status: 'Pending',
      },
      include: {
        account: {
          include: {
            user_profile: true,
          },
        },
        comity: true,
      },
    });

    if (!data) {
      throw new HttpException(
        {
          message: 'Data is not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Success to get data',
      data,
    };
  } catch (error: any) {
    throw new HttpException(
      {
        message: 'Failed to load data!',
        error: error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
