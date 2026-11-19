/** Claves centralizadas de caché para no dispersar strings por la app. */
export const CACHE_TAGS = {
  catalog: 'page-types',
  page: (slug: string) => `page-type:${slug}`,
  brand: 'studio-brand',
} as const;

/** 1 hora en el Data Cache de Next; el API además aplica stale-while-revalidate. */
export const REVALIDATE_SECONDS = 60 * 60;
