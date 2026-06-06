import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MembersServices } from '../services/members.service';
import { JwtAuthGuard } from 'src/apps/accounts/auth/guards/auth.guard';

@Controller('v1_beta/:organisasi/comity/anggota/')
export class MembersControllers {
  constructor(private readonly memberService: MembersServices) {}

  @Get('members')
  @UseGuards(JwtAuthGuard)
  async getMember(
    @Param() param,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req,
  ) {
    const person = await req.user;
    return await this.memberService.getMember(
      param,
      page,
      limit,
      person.userId,
    );
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async findUsers(@Query('q') search: string, @Req() req) {
    return await this.memberService.getInviteUsers(search);
  }

  @Post('search/:q')
  @UseGuards(JwtAuthGuard)
  async sendInvitationUser(@Param() params, @Req() req) {
    const user = await req.user;
    return await this.memberService.sendInviteUsers(params, user?.userId);
  }
}
