import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AcceptApplication } from 'src/helper/members/accept.application.user';
import AcceptInviteUser from 'src/helper/members/accept.invite.user';
import ComityCreateJoinRequest from 'src/helper/members/comity.join.request.user';
import { getInviteUser } from 'src/helper/members/get.invite.user';
import { getMembesHelper } from 'src/helper/members/get.members';
import { sendInviteUser } from 'src/helper/members/send.invite.user';
import { ShowJoinComity } from 'src/helper/members/show.join.comity.user';
import { ShowComiyRequest } from 'src/helper/members/show.request.user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembersServices {
  constructor(private readonly prisma: PrismaService) {}

  async getMember(param, page, limit, user) {
    return getMembesHelper(param, page, limit, this.prisma, user);
  }

  async showJoinComity(param) {
    return ShowJoinComity(this.prisma, param);
  }

  async getInviteUsers(search) {
    return getInviteUser(this.prisma, search);
  }

  async sendJoinComity(search, user) {
    return ComityCreateJoinRequest(this.prisma, search, user);
  }

  async sendInviteUsers(search, user) {
    return sendInviteUser(this.prisma, search, user);
  }

  async acceptInvitation(user, body) {
    return AcceptInviteUser(this.prisma, body, user);
  }

  async acceptApplication(params) {
    return AcceptApplication(this.prisma, params);
  }

  async receiveInviteUser(user) {
    return ShowComiyRequest(this.prisma, user);
  }

  async getAllRoleMember(params) {
    try {
      const members = await this.prisma.comity_Role.findMany({
        where: {
          comity: {
            urlLink: params,
          },
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
  }

  async updateRoleMembers(params, body) {
    console.log(params, body);
    try {
      const [members, roles] = await Promise.all([
        this.prisma.member_Profiles_Comities.findFirst({
          where: {
            member_id: body.id,
          },
          include: {
            role: true,
          },
        }),
        this.prisma.comity_Role.findFirst({
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

      const updateRole = await this.prisma.member_Profiles_Comities.update({
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
  }
}
