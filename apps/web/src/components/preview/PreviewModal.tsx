'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import type { PageType, PageTypeCatalog, PageTypeSlug } from '@/domain/entities/page-type';
import { PageExample } from '@/components/showcase/examples';
import { DemoChrome } from '@/components/showcase/examples/DemoChrome';

type Props = {
  catalog: PageTypeCatalog;
  activeSlug: PageTypeSlug | null;
  onClose: () => void;
};

export function PreviewModal({ catalog, activeSlug, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const page: PageType | undefined = catalog.items.find((item) => item.slug === activeSlug);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (activeSlug && !element.open) element.showModal();
    if (!activeSlug && element.open) element.close();
  }, [activeSlug]);

  if (!page) return <dialog className="preview" ref={dialog} />;

  const style = {
    '--preview-accent': page.accent,
    '--preview-soft': page.accentSoft,
    viewTransitionName: `preview-${page.slug}`,
  } as CSSProperties;

  return (
    <dialog
      className="preview"
      ref={dialog}
      style={style}
      aria-label={`Ejemplo interactivo de ${page.title}`}
      onClose={() => {
        if (activeSlug) onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="preview__head">
        <span className="preview__icon" aria-hidden>
          <ArrowUpRight size={19} />
        </span>
        <div>
          <h2>{page.title} — demo interactiva</h2>
          <p>
            {catalog.brand.name} · {page.tagline}
          </p>
        </div>
        <div className="preview__actions">
          <Link className="btn btn--small" href={`/showcase/${page.slug}`}>
            Pantalla completa <ArrowUpRight size={13} />
          </Link>
          <button className="preview__close" onClick={onClose} aria-label="Cerrar ejemplo">
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="preview__body">
        <DemoChrome page={page} brand={catalog.brand}>
          <PageExample page={page} brand={catalog.brand} />
        </DemoChrome>
        <p className="hint">
          <kbd>Esc</kbd> para cerrar · haz clic en los botones de la demo para interactuar
        </p>
      </div>
    </dialog>
  );
}
