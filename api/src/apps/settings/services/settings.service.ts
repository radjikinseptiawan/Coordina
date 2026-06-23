import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readRolePermissionHelper } from 'src/helper/settings/read-role';
import { updateRoleHelper } from 'src/helper/settings/update-role';
import { writeRoleHelper } from 'src/helper/settings/write-role';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async writeRolePermission(body, param) {
    return writeRoleHelper(this.prisma, param, body);
  }

  async readRolePermission(param) {
    return readRolePermissionHelper(this.prisma, param);
  }

  async updateRolePermission(param, body) {
    return updateRoleHelper(this.prisma, param, body);
  }
}
