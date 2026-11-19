import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { SendContactMessage } from '../../application/use-cases/send-contact-message.usecase';
import { parseContactMessage } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly sendContactMessage: SendContactMessage) {}

  @Post()
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  async create(@Body() body: unknown) {
    await this.sendContactMessage.execute(parseContactMessage(body));
    return { ok: true, message: 'Mensaje enviado' };
  }
}
