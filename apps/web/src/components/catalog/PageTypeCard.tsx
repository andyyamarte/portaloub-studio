'use client';

import type { CSSProperties } from 'react';
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Layers3,
  Music2,
  ShoppingBag,
  Target,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import type { PageType, PageTypeSlug } from '@/domain/entities/page-type';

const ICONS: Record<string, LucideIcon> = {
  target: Target,
  layers: Layers3,
  bag: ShoppingBag,
  chart: ChartNoAxesCombined,
  utensils: UtensilsCrossed,
  music: Music2,
};

type Props = {
  page: PageType;
  onSelect: (slug: PageTypeSlug) => void;
};

export function PageTypeCard({ page, onSelect }: Props) {
  const Icon = ICONS[page.icon] ?? Target;
  const style = {
    '--card-accent': page.accent,
    '--card-soft': page.accentSoft,
    viewTransitionName: `card-${page.slug}`,
  } as CSSProperties;

  return (
    <button
      type="button"
      className="card"
      style={style}
      onClick={() => onSelect(page.slug)}
      aria-label={`Abrir ejemplo interactivo: ${page.title}`}
    >
      <span className="card__media">
        <img src={page.image} alt={`Vista previa de ${page.title}`} loading="lazy" decoding="async" />
        <span className="card__badge">{page.eyebrow}</span>
        <span className="card__open" aria-hidden>
          <ArrowUpRight size={19} />
        </span>
      </span>

      <span className="card__body">
        <span className="card__title">
          {page.title}
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <span className="card__tagline">{page.tagline}</span>
        <span className="card__chips">
          {page.features.slice(0, 3).map((feature) => (
            <span className="card__chip" key={feature}>
              {feature}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
