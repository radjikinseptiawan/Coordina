import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const getAllMemberUserHelper = async (tcx: PrismaService, params) => {
  try {
    const members = await tcx.comity_Role.findMany({
      where: {
        comity: {
          urlLink: params,
          is_deleted: false,
        },
        is_deleted: false,
      },
      include: {
        permission: true,
      },
    });

    if (!members) {
      throw new HttpException(
        {
          message: 'Failed to found members',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Success to find data',
      data: members,
    };
  } catch (err) {
    throw new HttpException(
      {
        message: 'Something error!',
        error: err,
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
