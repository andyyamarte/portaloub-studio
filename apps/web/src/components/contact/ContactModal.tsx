'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Mail, Send, X } from 'lucide-react';
import type { StudioBrand } from '@/domain/entities/page-type';

type Props = {
  brand: StudioBrand;
  subjects: readonly string[];
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ brand, subjects, open, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError('');
    setSent(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre.trim(),
          email: correo.trim(),
          subject: asunto.trim() || 'Otro tipo de página',
          body: mensaje.trim(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? 'No se pudo enviar el mensaje.');

      setSent(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <dialog
      className="contact-modal"
      ref={dialog}
      aria-label={`Escribir a ${brand.name}`}
      onClose={() => {
        if (open) onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="contact-modal__head">
        <span className="contact-modal__icon"><Mail size={20} /></span>
        <div>
          <h2>Hablemos de tu proyecto</h2>
          <p>Escríbeme y te respondo en menos de 24 horas.</p>
        </div>
        <button className="preview__close" onClick={onClose} aria-label="Cerrar formulario">
          <X size={17} />
        </button>
      </div>

      <form className="contact-modal__body" onSubmit={submit}>
        <div className="contact-modal__field">
          <label htmlFor="contact-nombre">Tu nombre</label>
          <input
            id="contact-nombre"
            name="nombre"
            required
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>

        <div className="contact-modal__field">
          <label htmlFor="contact-correo">Tu correo</label>
          <input
            id="contact-correo"
            name="correo"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@correo.com"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
          />
        </div>

        <div className="contact-modal__field">
          <label htmlFor="contact-asunto">Asunto</label>
          <select
            id="contact-asunto"
            name="asunto"
            required
            value={asunto}
            onChange={(event) => setAsunto(event.target.value)}
          >
            <option value="" disabled>
              Selecciona el tipo de página
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
            <option value="Otro tipo de página">Otro tipo de página</option>
          </select>
        </div>

        <div className="contact-modal__field">
          <label htmlFor="contact-mensaje">Mensaje</label>
          <textarea
            id="contact-mensaje"
            name="mensaje"
            required
            rows={5}
            placeholder="Cuéntame qué página necesitas, para quién es y qué te gustaría lograr…"
            value={mensaje}
            onChange={(event) => setMensaje(event.target.value)}
          />
        </div>

        <div className="contact-modal__actions">
          <button type="submit" className="btn btn--primary" disabled={sending}>
            <Send size={15} /> {sending ? 'Enviando…' : 'Enviar'}
          </button>
        </div>

        {error && (
          <p className="contact-modal__note contact-modal__note--error" role="alert">
            {error}
          </p>
        )}

        {sent && (
          <p className="contact-modal__note" role="status">
            <strong>Mensaje enviado.</strong> En unos momentos te escribirán y responderán tu mensaje.
          </p>
        )}
      </form>
    </dialog>
  );
}
