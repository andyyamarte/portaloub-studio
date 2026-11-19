import { Injectable, Logger } from '@nestjs/common';
import { MailGateway, STUDIO_BRAND, type ContactMessage } from '@portaloub/contracts';
import { createTransport, type Transporter } from 'nodemailer';

/** Escapa texto libre antes de inyectarlo en el HTML del correo. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * INFRASTRUCTURE — pasarela de correo real usando Gmail SMTP.
 * Requiere GMAIL_USER y GMAIL_APP_PASSWORD en apps/api/.env.
 * El destinatario se controla con CONTACT_EMAIL.
 */
@Injectable()
export class GmailMailGateway extends MailGateway {
  private readonly logger = new Logger(GmailMailGateway.name);
  private readonly user =
    process.env.GMAIL_USER ?? process.env.CONTACT_EMAIL ?? STUDIO_BRAND.email;
  private readonly password = process.env.GMAIL_APP_PASSWORD ?? '';
  private readonly recipient = process.env.CONTACT_EMAIL ?? STUDIO_BRAND.email;
  private readonly transporter: Transporter | null;

  constructor() {
    super();

    if (!this.password) {
      this.logger.error(
        'GMAIL_APP_PASSWORD no configurado. Crea apps/api/.env con GMAIL_USER, ' +
          'GMAIL_APP_PASSWORD y CONTACT_EMAIL. Los mensajes no se enviarán hasta entonces.',
      );
      this.transporter = null;
      return;
    }

    this.transporter = createTransport({
      service: 'gmail',
      auth: { user: this.user, pass: this.password },
    });
  }

  async send(message: ContactMessage): Promise<void> {
    if (!this.transporter) {
      throw new Error(
        'El correo no está configurado. Revisa GMAIL_APP_PASSWORD en apps/api/.env.',
      );
    }

    const safeName = escapeHtml(message.name);
    const safeEmail = escapeHtml(message.email);
    const safeSubject = escapeHtml(message.subject);
    const safeBody = escapeHtml(message.body).replace(/\r?\n/g, '<br />');

    await this.transporter.sendMail({
      from: `"${STUDIO_BRAND.name} Web" <${this.user}>`,
      to: this.recipient,
      replyTo: message.email,
      subject: `[Web] ${message.subject} — ${message.name}`,
      text:
        `Nombre: ${message.name}\n` +
        `Correo: ${message.email}\n` +
        `Asunto: ${message.subject}\n\n` +
        `${message.body}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#161b2e">
          <h2 style="margin:0 0 12px">Nuevo mensaje desde la web</h2>
          <p style="margin:4px 0"><strong>Nombre:</strong> ${safeName}</p>
          <p style="margin:4px 0"><strong>Correo:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p style="margin:4px 0"><strong>Asunto:</strong> ${safeSubject}</p>
          <hr style="border:0;border-top:1px solid #e5e7eb;margin:16px 0" />
          <p style="margin:0">${safeBody}</p>
        </div>
      `,
    });

    this.logger.log(`Correo enviado desde ${this.user} a ${this.recipient}`);
  }
}
