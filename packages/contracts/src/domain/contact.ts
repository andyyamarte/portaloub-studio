/** DOMAIN — mensaje de contacto (sin dependencias de framework). */
export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly body: string;
}
