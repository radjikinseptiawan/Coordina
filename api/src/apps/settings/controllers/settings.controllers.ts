import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SettingsService } from '../services/settings.service';
import { MembersServices } from 'src/apps/members/services/members.service';
import { JwtAuthGuard } from 'src/apps/accounts/auth/guards/auth.guard';

@Controller('v1_beta/:organisasi/comity/settings')
@UseGuards(JwtAuthGuard)
export class SettingsControllers {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settingService: SettingsService,
    private readonly membersService: MembersServices,
  ) {}

  @Post('permission')
  async createPermission(@Body() body, @Param() param) {
    return this.settingService.writeRolePermission(body, param);
  }

  @Get('permission')
  async readRolePermission(@Param() param) {
    return this.settingService.readRolePermission(param);
  }

  @Patch('permission/:id')
  async updateRolePermission(@Param() param, @Body() body) {
    return this.settingService.updateRolePermission(param, body);
  }
}
