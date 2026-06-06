import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getInviteUser } from 'src/helper/members/get.invite.user';
import { getMembesHelper } from 'src/helper/members/get.members';
import { sendInviteUser } from 'src/helper/members/send.invite.user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembersServices {
  constructor(private readonly prisma: PrismaService) {}

  async getMember(param, page, limit, user) {
    return getMembesHelper(param, page, limit, this.prisma, user);
  }

  async getInviteUsers(search) {
    return getInviteUser(this.prisma, search);
  }

  async sendInviteUsers(search, user) {
    return sendInviteUser(this.prisma, search, user);
  }

  async acceptInvitation(user, body) {
    try {
      const users = await this.prisma.comity_Member_Request.findFirst({
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

      const profile = await this.prisma.user_Profile.findFirst({
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

      const data = await this.prisma.comity_Member_Request.update({
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

      const getRole = await this.prisma.comity_Role.findFirst({
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

      await this.prisma.member_Profiles_Comities.create({
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

  async receiveInviteUser(user) {
    try {
      const data = await this.prisma.comity_Member_Request.findMany({
        where: {
          account_id: user,
          status: 'Pending',
        },
        include: {
          account: {
            select: {
              username: true,
            },
          },
          comity: true,
        },
      });

      if (!data) {
        throw new HttpException(
          {
            message: 'Failed to catch data!, Not Found',
            data,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return new HttpException(
        {
          message: 'Success to catch data!, OK',
          data,
        },
        HttpStatus.OK,
      );
    } catch (e: any) {
      throw new HttpException(
        {
          message: 'Failed to catch data',
          error: e,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
