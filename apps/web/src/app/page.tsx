import { getCatalog } from '@/infrastructure/container';
import { HomeView } from '@/components/home/HomeView';

/** ISR: el catálogo se regenera como máximo cada hora (o por webhook). */
export const revalidate = 3600;

export default async function HomePage() {
  const catalog = await getCatalog();

  return (
    <>
      <HomeView catalog={catalog} />
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img src="/images/portaloub-logo.jpg" alt="PortalOub" width={40} height={40} className="footer__logo" />
            <span>
              Hecho con Next.js, Nest.js y CSS moderno por <strong>{catalog.brand.name}</strong>.
            </span>
          </div>
          <a
            className="footer__social"
            href="https://www.instagram.com/portaloub/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de PortalOub"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            @portaloub
          </a>
        </div>
      </footer>
    </>
  );
}
