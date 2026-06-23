import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const updateRoleHelper = async (tcx: PrismaService, param, body) => {
  try {
    const comity = await tcx.comity.findFirst({
      where: {
        urlLink: param.organisasi,
      },
    });

    if (!comity) {
      throw new HttpException(
        { message: 'Failed!, Comity Not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    // Gunakan transaksi agar proses hapus & insert permissions aman (atomik)
    return await tcx.$transaction(async (tx) => {
      const updatedRole = await tx.comity_Role.update({
        where: {
          id: param.id,
        },
        data: {
          name: body.data.roleName,
          description: body.data.description,
        },
      });

      await tx.permission.createMany({
        data: body.data.permissions.map((item: string) => ({
          name: item,
        })),
        skipDuplicates: true,
      });

      const dbPermissions = await tx.permission.findMany({
        where: {
          name: { in: body.data.permissions },
        },
      });

      await tx.role_Permission.deleteMany({
        where: {
          role_id: updatedRole.id,
        },
      });

      const newRolePermissions = await tx.role_Permission.createMany({
        data: dbPermissions.map((perm) => ({
          role_id: updatedRole.id,
          permission_id: perm.id,
        })),
      });

      return {
        message: 'Success update role and permissions',
        role: updatedRole,
        affectedPermissions: newRolePermissions.count,
      };
    });
  } catch (error: any) {
    console.error(error);
    throw new HttpException(
      {
        message: 'Failed to continue execution!',
        error: error.message || error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
