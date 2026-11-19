'use client';

import type { CSSProperties, ReactNode } from 'react';
import type { PageType, StudioBrand } from '@/domain/entities/page-type';
import s from './examples.module.css';

export function DemoBrand({ brand, light = false }: { brand: StudioBrand; light?: boolean }) {
  return (
    <span className={`${s.brandRow} ${light ? s.brandRowLight : ''}`}>
      <span className={s.brandLogo}>PO</span>
      <span className={s.brandText}>
        <strong>{brand.name}</strong>
        <small>{brand.role}</small>
      </span>
    </span>
  );
}

export function DemoFooter({ brand }: { brand: StudioBrand }) {
  return (
    <footer className={s.demoFooter}>
      <DemoBrand brand={brand} light />
      <span>{brand.tagline} · {brand.location}</span>
      <span>© {new Date().getFullYear()} {brand.name}</span>
    </footer>
  );
}

export function DemoChrome({
  page,
  brand,
  children,
}: {
  page: PageType;
  brand: StudioBrand;
  children: ReactNode;
}) {
  const style = { '--accent': page.accent, '--accent-soft': page.accentSoft } as CSSProperties;

  return (
    <div className={s.chrome} style={style}>
      <div className={s.chromeBar}>
        <span className={s.dots} aria-hidden>
          <i /><i /><i />
        </span>
        <span className={s.url}>portaloub.com/<b>{page.slug}</b></span>
        <span className={s.chromeTag}>
          <span className={s.chromeTagDot} />
          {brand.name} · demo interactiva
        </span>
      </div>
      <div className={s.demo}>{children}</div>
    </div>
  );
}
