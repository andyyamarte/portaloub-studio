import { Inject, Injectable } from '@nestjs/common';
import { PageTypeRepository, type PageTypeCatalog } from '@portaloub/contracts';

/** APPLICATION — caso de uso: devolver el catálogo completo. */
@Injectable()
export class GetCatalog {
  constructor(
    @Inject(PageTypeRepository)
    private readonly repository: PageTypeRepository,
  ) {}

  async execute(): Promise<PageTypeCatalog> {
    return this.repository.getCatalog();
  }
}
