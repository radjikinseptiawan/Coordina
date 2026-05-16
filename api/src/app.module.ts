import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './apps/accounts/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './apps/profile/profile.module';
import { ComityModule } from './apps/comity/comity.module';

@Module({
  imports: [AccountModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ProfileModule, ComityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
