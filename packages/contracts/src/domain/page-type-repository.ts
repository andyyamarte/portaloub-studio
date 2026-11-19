import type { PageType, PageTypeCatalog, PageTypeSlug, StudioBrand } from './page-type';

/**
 * Puerto (Dependency Inversion). La capa Application depende de este contrato,
 * nunca de Nest.js, fetch ni de ninguna base de datos concreta.
 */
export abstract class PageTypeRepository {
  abstract findAll(): Promise<readonly PageType[]>;
  abstract findBySlug(slug: PageTypeSlug): Promise<PageType | null>;
  abstract getBrand(): StudioBrand;
  abstract getCatalog(): Promise<PageTypeCatalog>;
}
