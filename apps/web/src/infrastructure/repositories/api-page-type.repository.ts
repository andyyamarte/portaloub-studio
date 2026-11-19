import {
  PAGE_TYPE_CATALOG,
  PageTypeRepository,
  type PageType,
  type PageTypeCatalog,
  type PageTypeSlug,
  type StudioBrand,
} from '@portaloub/contracts';
import { CACHE_TAGS, REVALIDATE_SECONDS } from '@/infrastructure/cache/tags';

const API_URL = process.env.API_INTERNAL_URL ?? 'http://127.0.0.1:3001';
const BASE = `${API_URL}/api/page-types`;

/**
 * INFRASTRUCTURE — adaptador HTTP.
 * - Data Cache de Next con tags + revalidación (ISR).
 * - Fallback al catálogo local si el API no está levantado (build sin servicio).
 */
export class ApiPageTypeRepository extends PageTypeRepository {
  private async get<T>(url: string, tag: string, fallback: T): Promise<T> {
    try {
      const response = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS, tags: [CACHE_TAGS.catalog, tag] },
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) return fallback;
      return (await response.json()) as T;
    } catch {
      return fallback;
    }
  }

  async findAll(): Promise<readonly PageType[]> {
    const catalog = await this.getCatalog();
    return catalog.items;
  }

  async findBySlug(slug: PageTypeSlug): Promise<PageType | null> {
    const local = PAGE_TYPE_CATALOG.items.find((item) => item.slug === slug) ?? null;
    const page = await this.get<PageType | null>(
      `${BASE}/${slug}`,
      CACHE_TAGS.page(slug),
      local,
    );
    return page?.slug === slug ? page : local;
  }

  getBrand(): StudioBrand {
    return PAGE_TYPE_CATALOG.brand;
  }

  async getCatalog(): Promise<PageTypeCatalog> {
    return this.get<PageTypeCatalog>(BASE, CACHE_TAGS.catalog, PAGE_TYPE_CATALOG);
  }
}
