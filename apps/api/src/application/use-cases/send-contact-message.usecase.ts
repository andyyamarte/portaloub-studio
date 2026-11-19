import { Inject, Injectable } from '@nestjs/common';
import { MailGateway, type ContactMessage } from '@portaloub/contracts';

/** APPLICATION — caso de uso de envío. No sabe qué proveedor de correo se usa. */
@Injectable()
export class SendContactMessage {
  constructor(
    @Inject(MailGateway)
    private readonly mail: MailGateway,
  ) {}

  async execute(message: ContactMessage): Promise<void> {
    await this.mail.send(message);
  }
}
