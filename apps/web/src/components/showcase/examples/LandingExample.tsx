'use client';

import { useState } from 'react';
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Mail,
  Quote, ShieldCheck, Sparkles, Star, StarHalf, Zap,
} from 'lucide-react';
import type { StudioBrand } from '@/domain/entities/page-type';
import { DemoBrand, DemoFooter } from './DemoChrome';
import s from './examples.module.css';

const PLANS = [
  { name: 'Esencial', price: 299, desc: 'Para empezar a vender hoy', features: ['1 landing page', 'Diseño responsive', 'Formulario de contacto', 'SSL y dominio'] },
  { name: 'Pro', price: 599, desc: 'Para negocios que quieren más', features: ['Hasta 5 secciones', 'Animaciones premium', 'Analítica y píxel', 'Copywriting incluido', 'Soporte 30 días'] },
  { name: 'Elite', price: 999, desc: 'Experiencia completa a medida', features: ['Diseño 100% a medida', 'Integraciones + API', 'A/B testing', 'Soporte 90 días', 'Sesión estratégica'] },
];

const REVIEWS = [
  { name: 'María Gómez', role: 'Fundadora · Viva Cosmetics', text: 'PortalOub entendió mi negocio en una sola reunión. La landing duplicó mis consultas en dos semanas.', initials: 'MG' },
  { name: 'Carlos Rivas', role: 'CEO · North Co.', text: 'Velocidad, claridad y resultados. El mejor proveedor con el que hemos trabajado.', initials: 'CR' },
  { name: 'Lucía Fernández', role: 'Artista · Estudio Aurora', text: 'Mi página se siente como yo. Cada detalle cuenta y se nota el cuidado.', initials: 'LF' },
];

const FAQ = [
  { q: '¿Cuánto tarda en estar lista?', a: 'Entre 5 y 10 días hábiles según el alcance. Los cambios se ven en tiempo real desde el primer día.' },
  { q: '¿Necesito tener el texto listo?', a: 'No. Puedo ayudarte con el copy persuasivo; solo cuéntame qué vendes y a quién.' },
  { q: '¿Incluye dominio y hosting?', a: 'Sí, en todos los planes. Tú eres dueño de todo desde el primer día.' },
  { q: '¿Puedo pedir cambios después?', a: 'Claro. Los planes Pro y Elite incluyen rondas de ajustes y soporte posterior.' },
];

export function LandingExample({ brand }: { brand: StudioBrand }) {
  const [sent, setSent] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [plan, setPlan] = useState(1);
  const [review, setReview] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadEmail, setLeadEmail] = useState('');
  const selectedPlan = PLANS[plan]!;
  const currentReview = REVIEWS[review]!;

  return (
    <div className={s.site}>
      <header className={s.nav}>
        <DemoBrand brand={brand} />
        <nav className={s.navLinks}><span>Beneficios</span><span>Planes</span><span>Reseñas</span><span>FAQ</span></nav>
        <button className={s.pillBtn} onClick={() => setSent(true)}>Empezar</button>
      </header>

      <section className={s.landingHero}>
        <div className={s.landingCopy}>
          <span className={s.kicker}>DISEÑO QUE VENDE</span>
          <h2>Convierte visitas en <em>clientes</em>.</h2>
          <p>Una landing page rápida, clara y hecha para una sola cosa: que tu negocio crezca.</p>
          <div className={s.row}>
            <button className={s.cta} onClick={() => setSent(true)}>
              Quiero mi landing <ArrowRight size={14} />
            </button>
            <button className={s.ghostBtn}>Ver planes ↓</button>
          </div>
          {sent && (
            <p className={s.success} role="status">
              <Check size={14} /> ¡Listo! PortalOub te contactará en menos de 24 h.
            </p>
          )}
          <div className={s.socialProof}>
            <span className={s.avatars}><i>A</i><i>M</i><i>J</i><i>+</i></span>
            <span><b>+120</b> proyectos · <b>4.9/5</b> valoración</span>
          </div>
        </div>
        <div className={s.landingVisual}>
          <div className={s.visualCard}>
            <span className={s.visualRing} />
            <span className={s.visualLine} />
            <span className={s.visualLineShort} />
          </div>
          <div className={s.floatStat}><strong>+38%</strong><small>conversiones</small></div>
          <div className={s.floatStatAlt}><Clock size={12} /> Entrega en 7 días</div>
        </div>
      </section>

      <section className={s.trustRow}>
        <span>STARLIGHT</span><span>NORTH CO.</span><span>VIVA</span><span>ORBITAL</span><span>KITE</span>
      </section>

      <section className={s.featureGrid}>
        <article><span className={s.featureIcon}><Zap size={16} /></span><h4>Rápida</h4><p>Carga en menos de 2 segundos. Puntuación 95+ en Lighthouse.</p></article>
        <article><span className={s.featureIcon}><ShieldCheck size={16} /></span><h4>Confiable</h4><p>SSL, analítica, backups y monitoreo incluidos.</p></article>
        <article><span className={s.featureIcon}><Sparkles size={16} /></span><h4>Persuasiva</h4><p>Copy y diseño pensados para convertir visitas.</p></article>
      </section>

      <section className={s.plansSection}>
        <div className={s.plansHead}>
          <div>
            <span className={s.kicker}>PLANES</span>
            <h3>Elige cómo quieres crecer</h3>
            <p>Sin sorpresas. Cancela cuando quieras.</p>
          </div>
          <button className={s.billingToggle} onClick={() => setAnnual((v) => !v)}>
            <span className={!annual ? s.billingOn : ''}>Mensual</span>
            <span className={annual ? s.billingOn : ''}>Anual <b>−20%</b></span>
          </button>
        </div>
        <div className={s.planGrid}>
          {PLANS.map((item, index) => (
            <article key={item.name} className={index === 1 ? s.planFeatured : ''}>
              {index === 1 && <span className={s.planBadge}>MÁS ELEGIDO</span>}
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
              <div className={s.planPrice}>
                <strong>${annual ? Math.round(item.price * 0.8) : item.price}</strong><small>/mes</small>
              </div>
              <button className={index === 1 ? s.cta : s.ghostBtn} onClick={() => { setPlan(index); setSent(true); }}>
                {index === 1 ? 'Elegir Pro' : 'Elegir plan'}
              </button>
              <ul>{item.features.map((f) => <li key={f}><Check size={12} /> {f}</li>)}</ul>
            </article>
          ))}
        </div>
        {sent && <p className={s.success} role="status"><Check size={14} /> Plan {selectedPlan.name} seleccionado · PortalOub te escribirá para confirmar.</p>}
      </section>

      <section className={s.reviewSection}>
        <div className={s.reviewHead}>
          <div>
            <span className={s.kicker}>RESEÑAS</span>
            <h3>Lo que dicen mis clientes</h3>
          </div>
          <div className={s.reviewNav}>
            <button onClick={() => setReview((r) => (r - 1 + REVIEWS.length) % REVIEWS.length)} aria-label="Anterior"><ChevronLeft size={15} /></button>
            <button onClick={() => setReview((r) => (r + 1) % REVIEWS.length)} aria-label="Siguiente"><ChevronRight size={15} /></button>
          </div>
        </div>
        <blockquote className={s.reviewCard}>
          <Quote size={20} className={s.quoteIcon} />
          <p>“{currentReview.text}”</p>
          <div className={s.reviewAuthor}>
            <span className={s.reviewAvatar}>{currentReview.initials}</span>
            <div><strong>{currentReview.name}</strong><small>{currentReview.role}</small></div>
            <span className={s.stars}><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><StarHalf size={11} fill="currentColor" /></span>
          </div>
          <div className={s.reviewDots}>{REVIEWS.map((_, i) => <button key={i} className={i === review ? s.dotActive : ''} onClick={() => setReview(i)} aria-label={`Reseña ${i + 1}`} />)}</div>
        </blockquote>
      </section>

      <section className={s.faqSection}>
        <span className={s.kicker}>PREGUNTAS FRECUENTES</span>
        <h3>Resuelve tus dudas</h3>
        <div className={s.faqList}>
          {FAQ.map((item, index) => (
            <div key={item.q} className={s.faqItem}>
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                {item.q}<ChevronDown size={14} className={openFaq === index ? s.chevOpen : ''} />
              </button>
              {openFaq === index && <p>{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={s.leadSection}>
        <Mail size={22} />
        <h3>Recibe una auditoría gratis de tu web</h3>
        <p>Te envío 3 ideas concretas para mejorar tu página.</p>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <input type="email" required placeholder="tu@correo.com" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
          <button className={s.cta} type="submit">Quiero mi auditoría <ArrowRight size={13} /></button>
        </form>
        {sent && leadEmail && <p className={s.success} role="status"><Check size={14} /> ¡Enviado! Revisa tu bandeja de entrada.</p>}
      </section>

      <DemoFooter brand={brand} />
    </div>
  );
}
