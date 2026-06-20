import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function AcceptApplication(tcx: PrismaService, params) {
  try {
    const comity = await tcx.comity.findFirst({
      where: {
        urlLink: params.organisasi,
      },
    });

    if (!comity) {
      throw new HttpException(
        {
          message: 'Failed get comity',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const existing = await tcx.comity_Member_Request.findUnique({
      where: {
        id: params.id,
      },
      include: { comity: true },
    });

    if (!existing) {
      throw new HttpException(
        {
          message: 'Request not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (existing?.status === 'Accepted') {
      throw new HttpException(
        {
          message: 'Failed!, member already joined!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const [role, profile] = await Promise.all([
      tcx.comity_Role.findFirst({
        where: {
          name: 'Members',
          comity_id: existing.comity_id,
        },
      }),
      await tcx.user_Profile.findFirst({
        where: {
          account_id: existing.account_id,
        },
      }),
    ]);

    if (!profile || !role) {
      throw new HttpException(
        {
          message: 'Data invalid!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const alreadyMember = await tcx.member_Profiles_Comities.findUnique({
      where: {
        member_id_comity_id: {
          member_id: profile.id,
          comity_id: existing.comity_id,
        },
      },
    });

    if (alreadyMember) {
      throw new HttpException(
        { message: 'User is already a member of this comity!' },
        HttpStatus.CONFLICT,
      );
    }

    await tcx.$transaction([
      tcx.comity_Member_Request.update({
        where: { id: params.id },
        data: { status: 'Accepted' },
      }),
      tcx.member_Profiles_Comities.create({
        data: {
          account_id: existing.account_id,
          comity_id: existing.comity_id,
          member_id: profile.id,
          role_id: role.id,
        },
      }),
    ]);

    return { message: 'Member accepted successfully!' };
  } catch (error: any) {
    throw new HttpException(
      {
        message: 'Failed to accept',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
