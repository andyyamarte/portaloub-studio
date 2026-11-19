import type { Metadata } from 'next';
import { PAGE_TYPES, STUDIO_BRAND, STUDIO_MEDIA } from '@portaloub/contracts';
import { Topbar } from '@/components/layout/Topbar';
import { ContactProvider } from '@/components/contact/ContactProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PortalOub — Páginas web que convierten',
    template: '%s | PortalOub',
  },
  description:
    'Diseño y desarrollo de landing pages, tiendas online, dashboards y sitios para restaurantes y artistas. Demos interactivas hechas por PortalOub.',
  keywords: ['PortalOub', 'diseño web', 'Next.js', 'landing page', 'tienda online'],
  icons: { icon: STUDIO_MEDIA.monogram },
  openGraph: {
    title: 'PortalOub — Diseño & Desarrollo Web',
    description: 'Elige un tipo de página y descubre cómo se vería la tuya.',
    type: 'website',
    locale: 'es_ES',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <ContactProvider
          brand={STUDIO_BRAND}
          subjects={PAGE_TYPES.map((page) => page.title)}
        >
          <div className="scroll-progress" aria-hidden />
          <Topbar brand={STUDIO_BRAND} />
          {children}
        </ContactProvider>
      </body>
    </html>
  );
}
