'use client';

import Link from 'next/link';
import type { StudioBrand } from '@/domain/entities/page-type';
import { useContact } from '@/components/contact/ContactProvider';

export function Topbar({ brand }: { brand: StudioBrand }) {
  const { openContact } = useContact();

  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <Link className="brand" href="/" aria-label={`${brand.name} — ir al inicio`}>
          <img className="brand__logo" src="/images/portaloub-logo.jpg" alt="PortalOub" width={40} height={40} />
          <span>
            <span className="brand__name">{brand.name}</span>
            <span className="brand__role">{brand.role}</span>
          </span>
        </Link>

        <nav className="topbar__links" aria-label="Navegación principal">
          <a href="#ejemplos">Ejemplos</a>
          <a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a>
          <button type="button" className="btn btn--primary btn--small" onClick={openContact}>
            Hablemos →
          </button>
        </nav>
      </div>
    </header>
  );
}
