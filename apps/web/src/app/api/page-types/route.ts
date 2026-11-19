import { NextResponse } from 'next/server';
import { getCatalog } from '@/infrastructure/container';

export const revalidate = 3600;

export async function GET() {
  const catalog = await getCatalog();
  return NextResponse.json(catalog, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
