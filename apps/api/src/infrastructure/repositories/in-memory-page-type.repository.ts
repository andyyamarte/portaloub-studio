import { Injectable } from '@nestjs/common';
import {
  PAGE_TYPE_CATALOG,
  PageTypeRepository,
  type PageType,
  type PageTypeCatalog,
  type PageTypeSlug,
  type StudioBrand,
} from '@portaloub/contracts';

/**
 * INFRASTRUCTURE — adaptador en memoria.
 * Mañana se puede cambiar por Prisma/Postgres sin tocar Application ni Domain.
 */
@Injectable()
export class InMemoryPageTypeRepository extends PageTypeRepository {
  private readonly items: readonly PageType[] = PAGE_TYPE_CATALOG.items;

  async findAll(): Promise<readonly PageType[]> {
    return this.items;
  }

  async findBySlug(slug: PageTypeSlug): Promise<PageType | null> {
    return this.items.find((item) => item.slug === slug) ?? null;
  }

  getBrand(): StudioBrand {
    return PAGE_TYPE_CATALOG.brand;
  }

  async getCatalog(): Promise<PageTypeCatalog> {
    return PAGE_TYPE_CATALOG;
  }
}
