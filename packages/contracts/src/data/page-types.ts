import type { PageType, PageTypeCatalog, StudioBrand } from '../domain/page-type';

export const STUDIO_BRAND: StudioBrand = {
  name: 'PortalOub',
  tagline: 'Estudio creativo digital',
  role: 'Diseño & Desarrollo Web',
  location: 'Venezuela · 100% remoto',
  email: 'portaloub@gmail.com',
  experience: '+5 años creando experiencias',
};

export const STUDIO_MEDIA = {
  hero: '/images/hero-portaloub.jpg',
  avatar: '/images/portaloub-avatar.svg',
  monogram: '/images/portaloub-monogram.svg',
} as const;

export const PAGE_TYPES: readonly PageType[] = [
  {
    id: 1,
    slug: 'landing-page',
    title: 'Landing Page',
    eyebrow: '01 · Conversión',
    tagline: 'Una pantalla, un objetivo: vender.',
    description:
      'Diseño enfocado en una sola acción. Copy, jerarquía visual y prueba social trabajando juntos para convertir visitantes en clientes.',
    image: '/images/landing-page.svg',
    accent: '#8B5CF6',
    accentSoft: '#2A1D4D',
    icon: 'target',
    features: ['Hero persuasivo', 'Formulario capturado', 'Prueba social', 'CTA sticky'],
    deliverables: ['Diseño a medida', 'Versión mobile', 'Analítica y metas', 'Despliegue'],
  },
  {
    id: 2,
    slug: 'one-page',
    title: 'One Page',
    eyebrow: '02 · Historia única',
    tagline: 'Todo tu mundo en un solo scroll.',
    description:
      'Una narrativa continua y fluida: quién eres, qué haces, por qué elegirte y cómo contactarte. Ideal para portafolios y profesionales.',
    image: '/images/one-page.svg',
    accent: '#22D3EE',
    accentSoft: '#10343D',
    icon: 'layers',
    features: ['Scroll narrativo', 'Secciones ancladas', 'Animaciones CSS', 'Portafolio vivo'],
    deliverables: ['Diseño editorial', 'Microinteracciones', 'SEO on-page', 'Despliegue'],
  },
  {
    id: 3,
    slug: 'tienda-online',
    title: 'Tienda Online',
    eyebrow: '03 · E-commerce',
    tagline: 'Tu catálogo listo para facturar.',
    description:
      'Catálogo atractivo, filtros rápidos, carrito intuitivo y checkout sin fricción. Pensada para vender mientras tú duermes.',
    image: '/images/tienda-online.svg',
    accent: '#F59E0B',
    accentSoft: '#3D2A10',
    icon: 'bag',
    features: ['Catálogo con filtros', 'Carrito reactivo', 'Checkout simple', 'Ficha de producto'],
    deliverables: ['Diseño de producto', 'Pasarela de pago', 'Panel de pedidos', 'Despliegue'],
  },
  {
    id: 4,
    slug: 'dashboard',
    title: 'Dashboard',
    eyebrow: '04 · Datos',
    tagline: 'Tus métricas, claras y accionables.',
    description:
      'Interfaces para tomar decisiones: KPIs, gráficas, tablas y alertas. Información compleja convertida en algo que se entiende de un vistazo.',
    image: '/images/dashboard.svg',
    accent: '#34D399',
    accentSoft: '#12362B',
    icon: 'chart',
    features: ['KPIs en vivo', 'Gráficas responsivas', 'Filtros por fecha', 'Modo oscuro'],
    deliverables: ['Design system', 'Componentes reutilizables', 'Roles y permisos', 'Despliegue'],
  },
  {
    id: 5,
    slug: 'restaurante',
    title: 'Páginas para Restaurantes',
    eyebrow: '05 · Hospitality',
    tagline: 'Hambre de clientes, servido.',
    description:
      'Carta digital apetitosa, reservas en un clic, horarios y ubicación. Todo lo que un comensal necesita antes de sentarse a la mesa.',
    image: '/images/restaurante.svg',
    accent: '#FB7185',
    accentSoft: '#3D1B24',
    icon: 'utensils',
    features: ['Carta por categorías', 'Reserva online', 'Galería de platos', 'Cómo llegar'],
    deliverables: ['Fotografía dirigida', 'Menú digital', 'WhatsApp y mapa', 'Despliegue'],
  },
  {
    id: 6,
    slug: 'artistas',
    title: 'Páginas de Artistas',
    eyebrow: '06 · Cultura',
    tagline: 'Tu obra, iluminada.',
    description:
      'Un espacio con personalidad para música, arte o cualquier disciplina: reproductor, galería, fechas y merch sin robarle protagonismo a tu trabajo.',
    image: '/images/artistas.svg',
    accent: '#C084FC',
    accentSoft: '#2E1A3D',
    icon: 'music',
    features: ['Reproductor', 'Galería inmersiva', 'Agenda de shows', 'Merch y contacto'],
    deliverables: ['Dirección de arte', 'Animaciones', 'Integración de música', 'Despliegue'],
  },
];

export const PAGE_TYPE_CATALOG: PageTypeCatalog = {
  brand: STUDIO_BRAND,
  items: PAGE_TYPES,
  meta: {
    total: PAGE_TYPES.length,
    generatedAt: '2026-01-01T00:00:00.000Z',
    version: '1.0.0',
  },
};
