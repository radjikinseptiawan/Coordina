import { Module } from '@nestjs/common';
import { SettingsControllers } from './controllers/settings.controllers';
import { SettingsService } from './services/settings.service';
import { MembersServices } from '../members/services/members.service';

@Module({
  controllers: [SettingsControllers],
  providers: [SettingsService, MembersServices],
})
export class SettingsModule {}
