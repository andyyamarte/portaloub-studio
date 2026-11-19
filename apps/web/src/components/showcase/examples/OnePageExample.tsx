'use client';

import { useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, BriefcaseBusiness, Check, Clock3, Code2, Heart,
  Mail, MapPin, Palette, Quote, Send, Sparkles,
} from 'lucide-react';
import type { StudioBrand } from '@/domain/entities/page-type';
import { DemoBrand, DemoFooter } from './DemoChrome';
import s from './examples.module.css';

const SECTIONS = ['inicio', 'servicios', 'trabajos', 'proceso', 'sobre-mi', 'contacto'] as const;
type SectionId = (typeof SECTIONS)[number];

const SERVICES = [
  { icon: Palette, title: 'Diseño UI/UX', text: 'Interfaces claras, accesibles y con identidad propia.', tags: ['Figma', 'Design system', 'Prototipos'] },
  { icon: Code2, title: 'Desarrollo web', text: 'React y Next.js para una web rápida y escalable.', tags: ['React', 'Next.js', 'TypeScript'] },
  { icon: Sparkles, title: 'Animaciones', text: 'Movimiento con intención que guía la mirada.', tags: ['GSAP', 'CSS', 'Scroll'] },
  { icon: BriefcaseBusiness, title: 'Estrategia', text: 'Estructura y copy pensados para tu objetivo.', tags: ['SEO', 'Copy', 'Analítica'] },
];

const WORKS = [
  { name: 'Campaña Aurora', type: 'Landing · 2026', tone: 'workA', metric: '+42% conversiones' },
  { name: 'Estudio Norte', type: 'One page · 2025', tone: 'workB', metric: '3× consultas' },
  { name: 'Casa Menta', type: 'Restaurante · 2025', tone: 'workC', metric: '+65% reservas' },
];

const TIMELINE = [
  { n: '01', title: 'Descubrimiento', text: 'Una llamada para entender tu negocio, tu audiencia y qué quieres lograr.', days: 'Día 1' },
  { n: '02', title: 'Diseño', text: 'Wireframes y una propuesta visual que puedes revisar y ajustar.', days: 'Días 2–4' },
  { n: '03', title: 'Desarrollo', text: 'Construyo la web responsive, animada y optimizada.', days: 'Días 5–8' },
  { n: '04', title: 'Lanzamiento', text: 'Publicación, pruebas y acompañamiento los primeros días.', days: 'Día 9' },
];

export function OnePageExample({ brand }: { brand: StudioBrand }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SectionId>('inicio');
  const [liked, setLiked] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');

  const goTo = (id: SectionId) => {
    setActive(id);
    scroller.current?.querySelector(`#op-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={s.site}>
      <div className={s.oneScroller} ref={scroller}>
        <header className={s.oneNav}>
          <DemoBrand brand={brand} />
          <nav>
            {SECTIONS.map((section) => (
              <button key={section} className={active === section ? s.navActive : ''} onClick={() => goTo(section)}>
                {section}
              </button>
            ))}
          </nav>
        </header>

        <section className={s.oneHero} id="op-inicio">
          <span className={s.kicker}>PORTFOLIO · 2026</span>
          <h2>Historias que se cuentan <em>con un scroll</em>.</h2>
          <p>Todo tu mundo en una sola página: quién eres, qué haces y cómo llegar a ti. Sin menús infinitos, sin fricción.</p>
          <div className={s.row}>
            <button className={s.cta} onClick={() => goTo('servicios')}>Explorar <ArrowDown size={14} /></button>
            <button className={s.ghostBtn} onClick={() => goTo('trabajos')}>Ver trabajos</button>
          </div>
          <div className={s.heroStatsRow}>
            <span><b>+120</b><small>proyectos</small></span>
            <span><b>8</b><small>años creando</small></span>
            <span><b>4.9/5</b><small>valoración</small></span>
          </div>
          <span className={s.scrollHint}>desliza para descubrir ↓</span>
        </section>

        <section className={s.oneSection} id="op-servicios">
          <span className={s.sectionNum}>01 / Servicios</span>
          <h3>De la idea al despliegue</h3>
          <p className={s.sectionLead}>Un solo aliado para todo tu lanzamiento. Sin coordinar tres proveedores distintos.</p>
          <div className={s.servicesGrid}>
            {SERVICES.map(({ icon: Icon, title, text, tags }) => (
              <article key={title}>
                <span className={s.serviceIcon}><Icon size={17} /></span>
                <h4>{title}</h4>
                <p>{text}</p>
                <div className={s.miniTags}>{tags.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className={s.oneSection} id="op-trabajos">
          <span className={s.sectionNum}>02 / Trabajos</span>
          <h3>Proyectos recientes</h3>
          <div className={s.workGrid}>
            {WORKS.map((work) => (
              <div key={work.name}>
                <span className={s[work.tone]} />
                <b>{work.name}</b>
                <small>{work.type}</small>
                <em className={s.workMetric}>{work.metric}</em>
              </div>
            ))}
          </div>
        </section>

        <section className={s.oneSection} id="op-proceso">
          <span className={s.sectionNum}>03 / Proceso</span>
          <h3>Así trabajamos juntos</h3>
          <div className={s.timeline}>
            {TIMELINE.map((step) => (
              <div className={s.timelineItem} key={step.n}>
                <span className={s.timelineNum}>{step.n}</span>
                <div><h4>{step.title}</h4><p>{step.text}</p></div>
                <small><Clock3 size={11} /> {step.days}</small>
              </div>
            ))}
          </div>
        </section>

        <section className={s.oneSection} id="op-sobre-mi">
          <span className={s.sectionNum}>04 / Sobre mí</span>
          <h3>Diseño con intención, código con cuidado.</h3>
          <div className={s.aboutGrid}>
            <div className={s.aboutCard}>
              <span className={s.aboutAvatarPO}>PO</span>
              <div><strong>PortalOub</strong><small>Diseñador & desarrollador web</small></div>
              <button className={liked ? s.likeOn : s.likeBtn} onClick={() => setLiked((v) => !v)} aria-label="Me gusta">
                <Heart size={14} fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Gracias' : 'Me gusta'}
              </button>
            </div>
            <div className={s.aboutText}>
              <p>Llevo 8 años convirtiendo ideas en experiencias digitales. Me gusta que cada proyecto tenga una razón de ser y un resultado medible.</p>
              <div className={s.checkList}>
                <span><Check size={12} /> Comunicación directa contigo</span>
                <span><Check size={12} /> Entregas en fechas reales</span>
                <span><Check size={12} /> Código limpio y documentado</span>
                <span><MapPin size={12} /> Trabajo remoto desde Venezuela</span>
              </div>
            </div>
          </div>
          <blockquote className={s.oneQuote}>
            <Quote size={18} />
            <p>«PortalOub no solo hizo mi página: entendió mi negocio y me ayudó a vender más.»</p>
            <small>— María G., fundadora de Viva Cosmetics</small>
          </blockquote>
        </section>

        <section className={s.oneContact} id="op-contacto">
          <Mail size={20} />
          <h3>¿Hacemos algo juntos?</h3>
          <p>Cuéntame tu idea y la convertimos en una página real.</p>
          <form className={s.contactForm} onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
            <input required placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <button className={s.cta} type="submit"><Send size={13} /> Enviar mensaje</button>
          </form>
          {formSent && <p className={s.success} role="status"><Check size={13} /> ¡Gracias {name || 'a ti'}! PortalOub te responderá pronto.</p>}
          <button className={s.textBtn} onClick={() => goTo('inicio')}>Volver arriba ↑</button>
        </section>

        <DemoFooter brand={brand} />
      </div>
    </div>
  );
}
