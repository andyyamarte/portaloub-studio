import type { ContactMessage } from './contact';

/** Puerto de salida: el envío real se implementa en Infrastructure. */
export abstract class MailGateway {
  abstract send(message: ContactMessage): Promise<void>;
}
