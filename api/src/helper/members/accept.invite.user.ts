import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

export default async function AcceptInviteUser(tcx:PrismaService, body, user){
    try {
      const users = await tcx.comity_Member_Request.findFirst({
        where: {
          id: body.id,
          AND: [{ id: body.id }, { account_id: user }],
        },
        include: {
          comity: true,
        },
      });

      if (!users) {
        throw new HttpException(
          { message: 'Failed to found users' },
          HttpStatus.NOT_FOUND,
        );
      }

      const profile = await tcx.user_Profile.findFirst({
        where: {
          account_id: user,
        },
      });

      if (!profile) {
        throw new HttpException(
          { message: 'Data not found!' },
          HttpStatus.NOT_FOUND,
        );
      }

      const data = await tcx.comity_Member_Request.update({
        where: {
          id: users?.id,
        },
        data: {
          status: 'Accepted',
        },
      });

      if (!data) {
        throw new HttpException(
          {
            message: 'Failed to update request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const getRole = await tcx.comity_Role.findFirst({
        where: {
          name: 'Members',
          comity_id: data.comity_id,
        },
      });

      if (!getRole) {
        throw new HttpException(
          { message: 'Data not found!' },
          HttpStatus.NOT_FOUND,
        );
      }

      await tcx.member_Profiles_Comities.create({
        data: {
          account_id: user,
          comity_id: users.comity_id,
          member_id: profile?.id,
          role_id: getRole?.id,
        },
      });

      return new HttpException(
        {
          message: 'success to update data',
          data,
        },
        HttpStatus.ACCEPTED,
      );
    } catch (err: any) {
      throw new HttpException(
        {
          message: 'Error!',
          error: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
}