'use client';

import type { PageType, StudioBrand } from '@/domain/entities/page-type';
import { LandingExample } from './LandingExample';
import { OnePageExample } from './OnePageExample';
import { StoreExample } from './StoreExample';
import { DashboardExample } from './DashboardExample';
import { RestaurantExample } from './RestaurantExample';
import { ArtistExample } from './ArtistExample';

/** Punto único de entrada: el slug decide qué demo se monta. */
export function PageExample({ page, brand }: { page: PageType; brand: StudioBrand }) {
  switch (page.slug) {
    case 'landing-page':
      return <LandingExample brand={brand} />;
    case 'one-page':
      return <OnePageExample brand={brand} />;
    case 'tienda-online':
      return <StoreExample brand={brand} />;
    case 'dashboard':
      return <DashboardExample brand={brand} />;
    case 'restaurante':
      return <RestaurantExample brand={brand} />;
    case 'artistas':
      return <ArtistExample brand={brand} />;
  }
}
