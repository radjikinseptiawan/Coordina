import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const writeRoleHelper = async (tcx: PrismaService, param, body) => {
  try {
    const comity = await tcx.comity.findFirst({
      where: {
        urlLink: param.organisasi,
      },
    });

    if (!comity) {
      throw new HttpException(
        {
          message: 'Failed!, Comity Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const [roleName, permission] = await Promise.all([
      tcx.comity_Role.create({
        data: {
          comity_id: comity?.id,
          description: body.data.description,
          name: body.data.roleName,
        },
      }),
      tcx.permission.findMany({
        where: {
          name: {
            in: body.data.permissions,
          },
        },
      }),
    ]);

    const [createRolePermission, createPermission] = await Promise.all([
      tcx.role_Permission.createMany({
        data: permission.map((perm) => ({
          role_id: roleName.id,
          permission_id: perm.id,
        })),
      }),
      tcx.permission.createMany({
        data: body.data.permissions.map((item) => ({
          name: item,
        })),
      }),
    ]);

    const payload = {
      createRolePermission,
      createPermission,
    };

    return {
      message: 'Success add role',
      payload,
    };
  } catch (error: any) {
    console.log(error);
    throw new HttpException(
      {
        message: 'Failed to continue execution!',
        error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
