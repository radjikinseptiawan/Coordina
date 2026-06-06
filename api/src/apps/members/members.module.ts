import { Module } from '@nestjs/common';
import { MembersControllers } from './controllers/membes.controllers';
import { MembersServices } from './services/members.service';

@Module({
  controllers: [MembersControllers],
  providers: [MembersServices],
})
export class MembersModule {}
