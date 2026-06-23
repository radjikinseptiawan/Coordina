import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const updateMemberRoleHelper = async (tcx: PrismaService, body) => {
  try {
    const [members, roles] = await Promise.all([
      tcx.member_Profiles_Comities.findFirst({
        where: {
          member_id: body.id,
        },
        include: {
          role: true,
        },
      }),
      tcx.comity_Role.findFirst({
        where: {
          name: body.role,
        },
      }),
    ]);

    if (!members) {
      throw new HttpException(
        {
          message: 'Members not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const updateRole = await tcx.member_Profiles_Comities.update({
      where: {
        id: members?.id,
      },
      data: {
        role_id: roles?.id,
      },
    });

    return {
      message: 'Success fetch data',
      oldData: members,
      updateData: updateRole,
    };
  } catch (error: any) {
    console.error(error);
    throw new HttpException(
      {
        message: 'Something error!',
        error: error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
