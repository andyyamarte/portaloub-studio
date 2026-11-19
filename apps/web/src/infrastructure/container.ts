import { cache } from 'react';
import { GetCatalog } from '@/application/use-cases/get-catalog.usecase';
import { GetPageType } from '@/application/use-cases/get-page-type.usecase';
import { ApiPageTypeRepository } from '@/infrastructure/repositories/api-page-type.repository';

/** Composition root: único lugar donde se arma el grafo de dependencias. */
const repository = new ApiPageTypeRepository();

/** `cache()` deduplica la petición dentro de un mismo render (React request memoization). */
export const getCatalog = cache(() => new GetCatalog(repository).execute());
export const getPageType = cache((slug: string) => new GetPageType(repository).execute(slug));
