import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common'; // 1. Tambahkan Res
import { Response } from 'express'; // 2. Impor Response dari express
import { WhatsappService } from '../services/whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  // Endpoint untuk Verifikasi Webhook Meta
  @Get()
  verifyWebhook(@Query() query: any, @Res() res) {
    // 3. Suntikkan @Res() di sini
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    // LOG UNTUK DEBUGGING (Opsional, hapus jika sudah berhasil)
    console.log('Token dari Meta:', token);
    console.log('Token di .env Anda:', process.env.WHATSAPP_VERIFY_TOKEN);

    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        // 4. Kirim respons sebagai plain text dengan status 200 OK
        return res.status(200).send(challenge);
      }
    }

    // Jika tidak cocok, kirim status Forbidden
    return res.status(403).send('Verification failed');
  }

  @Post()
  receiveMessage(@Body() body: any) {
    this.whatsappService.handleWebhook(body);
    return { success: true };
  }
}
