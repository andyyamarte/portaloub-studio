import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { CACHE_TAGS } from '@/infrastructure/cache/tags';

/** Endpoint para invalidar el Data Cache de forma controlada (webhook del CMS, etc.). */
export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (secret !== (process.env.REVALIDATE_SECRET ?? 'dev-secret')) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  revalidateTag(CACHE_TAGS.catalog, 'max');
  return NextResponse.json({ revalidated: true, tag: CACHE_TAGS.catalog, at: Date.now() });
}
