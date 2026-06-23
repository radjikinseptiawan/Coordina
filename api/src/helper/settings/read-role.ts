import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const readRolePermissionHelper = async (tcx: PrismaService, param) => {
  try {
    const getDataRole = await tcx.comity_Role.findMany({
      where: {
        comity: {
          urlLink: param.organisasi,
        },
      },
      include: {
        permission: {
          include: {
            role: true,
            permission: true,
          },
        },
      },
    });

    return {
      message: 'Success get data',
      data: getDataRole,
    };
  } catch (error: any) {
    console.error(error);
    throw new HttpException(
      {
        message: 'Failed! something is error',
        error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
