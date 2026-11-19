'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { StudioBrand } from '@/domain/entities/page-type';
import { ContactModal } from './ContactModal';

type ContactContextValue = {
  openContact: () => void;
  closeContact: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({
  brand,
  subjects,
  children,
}: {
  brand: StudioBrand;
  subjects: readonly string[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const value = useMemo<ContactContextValue>(
    () => ({
      openContact: () => setOpen(true),
      closeContact: () => setOpen(false),
    }),
    [],
  );

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactModal
        brand={brand}
        subjects={subjects}
        open={open}
        onClose={() => setOpen(false)}
      />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact debe usarse dentro de ContactProvider');
  }
  return context;
}
