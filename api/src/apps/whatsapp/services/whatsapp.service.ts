import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  private readonly whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;
  private readonly phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  private readonly apiUrl = `https://facebook.com/${this.phoneId}/messages`;

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(to: string, message: string) {
    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: { body: message },
    };

    const headers = {
      Authorization: `Bearer ${this.whatsappToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = this.httpService.post(this.apiUrl, data, { headers });
      return lastValueFrom(response);
    } catch (error) {
      console.error(error);
    }
  }

  handleWebhook(body: any) {
    // Logika untuk menerima dan memproses pesan masuk
    if (body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const messageData = body.entry[0].changes[0].value.messages[0];
      const senderPhone = messageData.from;
      const messageText = messageData.text.body;

      console.log(`Pesan dari ${senderPhone}: ${messageText}`);
      // Panggil sendMessage di sini untuk auto-reply
    }
  }
}
