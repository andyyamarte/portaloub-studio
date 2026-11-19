import { Inject, Injectable } from '@nestjs/common';
import { isPageTypeSlug, PageTypeRepository, type PageType } from '@portaloub/contracts';

/** APPLICATION — caso de uso: resolver una página por su slug. */
@Injectable()
export class GetPageType {
  constructor(
    @Inject(PageTypeRepository)
    private readonly repository: PageTypeRepository,
  ) {}

  async execute(slug: string): Promise<PageType | null> {
    if (!isPageTypeSlug(slug)) return null;
    return this.repository.findBySlug(slug);
  }
}
