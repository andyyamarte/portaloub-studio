'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { STUDIO_MEDIA } from '@portaloub/contracts';
import type { StudioBrand } from '@/domain/entities/page-type';
import { useContact } from '@/components/contact/ContactProvider';

type Props = {
  brand: StudioBrand;
  totalProjects: number;
};

export function Hero({ brand, totalProjects }: Props) {
  const root = useRef<HTMLElement>(null);
  const { openContact } = useContact();

  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    // GSAP se carga de forma diferida: no bloquea el primer render.
    void import('gsap').then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const ctx = gsap.context(() => {
        gsap.from('.hero-reveal', {
          y: 26,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
        gsap.from('.hero__art', {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          delay: 0.18,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }, root);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="container hero__grid">
        <div>
          <span className="hero__eyebrow hero-reveal">
            <span className="dot" />
            Disponible para nuevos proyectos
          </span>

          <h1 className="hero-reveal">
            Soy PortalOub.
            <br />
            <span className="gradient-text">¿Necesitas una página web?</span>
          </h1>

          <p className="hero__lead hero-reveal">
            Diseño y desarrollo experiencias digitales que se ven increíbles, cargan rápido y
            convierten. Elige un tipo de página y descubre cómo se vería la tuya.
          </p>

          <div className="hero__actions hero-reveal">
            <a className="btn btn--primary" href="#ejemplos">
              Ver los ejemplos <ArrowDown size={16} />
            </a>
            <button type="button" className="btn" onClick={openContact}>
              Hablemos de tu idea <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="hero__stats hero-reveal">
            <div className="hero__stat">
              <strong>{totalProjects}</strong>
              <span>tipos de proyecto</span>
            </div>
            <div className="hero__stat">
              <strong>{brand.experience}</strong>
              <span>de experiencia</span>
            </div>
            <div className="hero__stat">
              <strong>100%</strong>
              <span>remoto</span>
            </div>
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__art-frame">
            {/* Foto local del hero */}
            <img
              src={STUDIO_MEDIA.hero}
              alt="Vista previa web de PortalOub"
              width={1280}
              height={1919}
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero__badge">
              <strong>
                <Sparkles size={13} aria-hidden /> PortalOub
              </strong>
              <span>{brand.tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
