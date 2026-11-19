import { BadRequestException } from '@nestjs/common';
import type { ContactMessage } from '@portaloub/contracts';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

/** Validación manual: evita depender de class-validator para un DTO tan pequeño. */
export function parseContactMessage(input: unknown): ContactMessage {
  if (!input || typeof input !== 'object') {
    throw new BadRequestException('Datos del formulario inválidos');
  }

  const raw = input as Record<string, unknown>;
  const name = text(raw['name']);
  const email = text(raw['email']);
  const subject = text(raw['subject']) || 'Nuevo proyecto';
  const body = text(raw['body'] || raw['message']);

  if (name.length < 2 || name.length > 100) {
    throw new BadRequestException('Escribe un nombre válido');
  }
  if (!EMAIL.test(email) || email.length > 150) {
    throw new BadRequestException('Escribe un correo válido');
  }
  if (body.length < 5 || body.length > 4000) {
    throw new BadRequestException('El mensaje debe tener entre 5 y 4000 caracteres');
  }

  return { name, email, subject: subject.slice(0, 150), body };
}
