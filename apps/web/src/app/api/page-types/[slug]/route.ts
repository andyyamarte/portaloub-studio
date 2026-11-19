import { NextResponse } from 'next/server';
import { isPageTypeSlug } from '@/domain/entities/page-type';
import { getPageType } from '@/infrastructure/container';

export const revalidate = 3600;

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  if (!isPageTypeSlug(slug)) {
    return NextResponse.json({ message: 'Tipo de página no encontrado' }, { status: 404 });
  }

  const page = await getPageType(slug);
  if (!page) {
    return NextResponse.json({ message: 'Tipo de página no encontrado' }, { status: 404 });
  }

  return NextResponse.json(page, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
