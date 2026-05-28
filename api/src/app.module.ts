import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './apps/accounts/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './apps/profile/profile.module';
import { ComityModule } from './apps/comity/comity.module';
import { MulterModule } from '@nestjs/platform-express';
import { WhatsappModule } from './apps/whatsapp/whatsapp.module';

@Module({
  imports: [
    AccountModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProfileModule,
    ComityModule,
    MulterModule,
    WhatsappModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
