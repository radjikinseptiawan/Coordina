import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AcceptApplication } from 'src/helper/members/accept.application.user';
import AcceptInviteUser from 'src/helper/members/accept.invite.user';
import ComityCreateJoinRequest from 'src/helper/members/comity.join.request.user';
import { getAllMemberUserHelper } from 'src/helper/members/get.all.member.user';
import { getInviteUser } from 'src/helper/members/get.invite.user';
import { getMembesHelper } from 'src/helper/members/get.members';
import { sendInviteUser } from 'src/helper/members/send.invite.user';
import { ShowJoinComity } from 'src/helper/members/show.join.comity.user';
import { ShowComiyRequest } from 'src/helper/members/show.request.user';
import { updateMemberRoleHelper } from 'src/helper/members/update.member.role.helper';
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
    return getAllMemberUserHelper(this.prisma, params);
  }

  async updateRoleMembers(params, body) {
    return updateMemberRoleHelper(this.prisma, body);
  }

  async deleteRoleMembers(params) {
    try {
      const role = await this.prisma.comity_Role.update({
        where: {
          id: params.id,
          comity: {
            urlLink: params.organisasi,
          },
        },
        data: {
          is_deleted: true,
        },
      });

      if (!role) {
        throw new HttpException(
          {
            message: 'Failed!, user not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Success get data',
        role,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          message: 'Failed!, Internal Server Error!',
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
