/**
 * Capa DOMAIN — entidades puras, sin dependencias de frameworks.
 * Este archivo es la fuente de verdad del contrato entre el API y la web.
 */

export const PAGE_TYPE_SLUGS = [
  'landing-page',
  'one-page',
  'tienda-online',
  'dashboard',
  'restaurante',
  'artistas',
] as const;

export type PageTypeSlug = (typeof PAGE_TYPE_SLUGS)[number];

export interface PageType {
  readonly id: number;
  readonly slug: PageTypeSlug;
  readonly title: string;
  readonly eyebrow: string;
  readonly tagline: string;
  readonly description: string;
  readonly image: string;
  readonly accent: string;
  readonly accentSoft: string;
  readonly icon: string;
  readonly features: readonly string[];
  readonly deliverables: readonly string[];
}

export interface StudioBrand {
  readonly name: string;
  readonly tagline: string;
  readonly role: string;
  readonly location: string;
  readonly email: string;
  readonly experience: string;
}

export interface CatalogMeta {
  readonly total: number;
  readonly generatedAt: string;
  readonly version: string;
}

export interface PageTypeCatalog {
  readonly brand: StudioBrand;
  readonly items: readonly PageType[];
  readonly meta: CatalogMeta;
}

export function isPageTypeSlug(value: string): value is PageTypeSlug {
  return (PAGE_TYPE_SLUGS as readonly string[]).includes(value);
}
