import type { PageTypeCatalog } from '@/domain/entities/page-type';
import { PageTypeRepository } from '@/domain/ports/page-type-repository';

/** APPLICATION — orquesta la obtención del catálogo sin saber de HTTP. */
export class GetCatalog {
  constructor(private readonly repository: PageTypeRepository) {}

  async execute(): Promise<PageTypeCatalog> {
    return this.repository.getCatalog();
  }
}
