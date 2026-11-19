import { Controller, Get, Header, NotFoundException, Param, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { GetCatalog } from '../../application/use-cases/get-catalog.usecase';
import { GetPageType } from '../../application/use-cases/get-page-type.usecase';

/** INTERFACES — capa HTTP. Solo adapta el protocolo, la lógica vive en Application. */
@Controller('page-types')
@UseInterceptors(CacheInterceptor)
export class PageTypesController {
  constructor(
    private readonly getCatalog: GetCatalog,
    private readonly getPageType: GetPageType,
  ) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
  findAll() {
    return this.getCatalog.execute();
  }

  @Get(':slug')
  @Header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
  async findOne(@Param('slug') slug: string) {
    const page = await this.getPageType.execute(slug);
    if (!page) throw new NotFoundException(`No existe el tipo de página "${slug}"`);
    return page;
  }
}
