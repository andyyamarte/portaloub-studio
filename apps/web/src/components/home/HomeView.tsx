'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Code2, Gauge, Palette } from 'lucide-react';
import { isPageTypeSlug, type PageTypeCatalog, type PageTypeSlug } from '@/domain/entities/page-type';
import { Hero } from '@/components/hero/Hero';
import { PageTypeCard } from '@/components/catalog/PageTypeCard';
import { PreviewModal } from '@/components/preview/PreviewModal';
import { useContact } from '@/components/contact/ContactProvider';

const STEPS = [
  { icon: Palette, title: 'Diseño', text: 'Entiendo tu negocio y diseño una interfaz con intención.' },
  { icon: Code2, title: 'Desarrollo', text: 'La construyo con React y Next.js: rápida y responsive.' },
  { icon: Gauge, title: 'Lanzamiento', text: 'Optimizo, mido y la dejo lista para crecer.' },
];

export function HomeView({ catalog }: { catalog: PageTypeCatalog }) {
  const [activeSlug, setActiveSlug] = useState<PageTypeSlug | null>(null);
  const { openContact } = useContact();

  // La vista activa vive en la URL (?vista=slug) para poder compartirla.
  useEffect(() => {
    const sync = () => {
      const value = new URLSearchParams(window.location.search).get('vista') ?? '';
      setActiveSlug(isPageTypeSlug(value) ? value : null);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const writeUrl = (slug: PageTypeSlug | null) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set('vista', slug);
    else url.searchParams.delete('vista');
    window.history.pushState({}, '', url);
    setActiveSlug(slug);
  };

  return (
    <>
      <Hero brand={catalog.brand} totalProjects={catalog.meta.total} />

      <main>
        <section className="catalog container" id="ejemplos">
          <div className="section-head">
            <div>
              <h2>
                Tipos de página que <span className="gradient-text">puedes estar buscando</span>:
              </h2>
            </div>
            <p>
              Cada tarjeta es una vista real. Haz clic y entra en una demo interactiva hecha con
              el nombre de {catalog.brand.name}.
            </p>
          </div>

          <div className="card-grid">
            {catalog.items.map((page) => (
              <PageTypeCard key={page.slug} page={page} onSelect={writeUrl} />
            ))}
          </div>
        </section>

        <section className="process" id="proceso">
          <div className="container process__inner">
            <div>
              <div className="section-head">
                <div>
                  <span className="section-head__kicker">Cómo trabajo</span>
                  <h2>De tu idea a la web en 3 pasos</h2>
                </div>
              </div>
              <div className="process__grid">
                {STEPS.map((step, index) => (
                  <article key={step.title}>
                    <span className="process__number">0{index + 1}</span>
                    <span className="process__icon"><step.icon size={20} /></span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="process__art">
              <img
                src="/images/portaloub-extra.jpg"
                alt="Proceso de diseño y desarrollo web de PortalOub"
                width={1280}
                height={1916}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="contact" id="contacto">
          <div className="container contact__inner">
            <div>
              <span className="section-head__kicker">Hablemos con PortalOub</span>
              <h2>
                Tu próxima página, <span className="gradient-text">hagámoslo realidad.</span>
              </h2>
            </div>
            <button className="btn btn--primary" onClick={openContact}>
              Hablemos <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <PreviewModal catalog={catalog} activeSlug={activeSlug} onClose={() => writeUrl(null)} />
    </>
  );
}
