import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PAGE_TYPE_SLUGS, isPageTypeSlug } from '@/domain/entities/page-type';
import { getCatalog, getPageType } from '@/infrastructure/container';
import { DemoChrome } from '@/components/showcase/examples/DemoChrome';
import { PageExample } from '@/components/showcase/examples';

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return PAGE_TYPE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = isPageTypeSlug(slug) ? await getPageType(slug) : null;
  if (!page) return { title: 'Ejemplo no encontrado' };
  return {
    title: page.title,
    description: `${page.tagline} Demo interactiva creada por PortalOub.`,
  };
}

export default async function ShowcasePage({ params }: Params) {
  const { slug } = await params;
  const [page, catalog] = await Promise.all([
    isPageTypeSlug(slug) ? getPageType(slug) : Promise.resolve(null),
    getCatalog(),
  ]);

  if (!page) notFound();

  return (
    <main className="showcase container">
      <div className="showcase__bar">
        <Link className="btn btn--small" href="/#ejemplos">
          <ArrowLeft size={14} /> Volver a los ejemplos
        </Link>
        <span className="section-head__kicker">
          {page.eyebrow} · {catalog.brand.name}
        </span>
        <a className="btn btn--small" href={`mailto:${catalog.brand.email}?subject=Quiero%20una%20${page.title}`}>
          Pedir este diseño <ExternalLink size={13} />
        </a>
      </div>

      <div className="showcase__frame">
        <DemoChrome page={page} brand={catalog.brand}>
          <PageExample page={page} brand={catalog.brand} />
        </DemoChrome>
      </div>
    </main>
  );
}
