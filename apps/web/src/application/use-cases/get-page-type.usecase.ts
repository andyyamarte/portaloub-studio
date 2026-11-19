import { isPageTypeSlug, type PageType } from '@/domain/entities/page-type';
import { PageTypeRepository } from '@/domain/ports/page-type-repository';

export class GetPageType {
  constructor(private readonly repository: PageTypeRepository) {}

  async execute(slug: string): Promise<PageType | null> {
    if (!isPageTypeSlug(slug)) return null;
    return this.repository.findBySlug(slug);
  }
}
