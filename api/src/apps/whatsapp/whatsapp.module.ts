import { Module } from '@nestjs/common';
import { WhatsappController } from './controllers/whatsapp.controllers';
import { WhatsappService } from './services/whatsapp.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WhatsappController],
  providers: [WhatsappService],
})
export class WhatsappModule {}
