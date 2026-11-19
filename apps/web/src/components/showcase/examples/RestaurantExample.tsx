'use client';

import { useState } from 'react';
import {
  AtSign, Camera, Check, ChevronLeft, ChevronRight, Clock, Heart,
  MapPin, Phone, Quote, ShoppingBag, Star, StarHalf, Users,
} from 'lucide-react';
import type { StudioBrand } from '@/domain/entities/page-type';
import { DemoBrand, DemoFooter } from './DemoChrome';
import s from './examples.module.css';

const CATEGORIES = ['Entradas', 'Platos', 'Postres', 'Bebidas'] as const;
type Category = (typeof CATEGORIES)[number];

const MENU: Record<Category, { name: string; desc: string; price: number; tag?: string }[]> = {
  Entradas: [
    { name: 'Pan con tomate', desc: 'Aceite de oliva, jamón ibérico y tomate rallado', price: 9, tag: 'Clásico' },
    { name: 'Croquetas de la casa', desc: 'Seis unidades con salsa brava casera', price: 12 },
    { name: 'Ensalada mediterránea', desc: 'Queso feta, aceitunas y vinagreta de hierbas', price: 11, tag: 'Vegano' },
  ],
  Platos: [
    { name: 'Paella del chef', desc: 'Mariscos frescos, arroz bomba y azafrán', price: 24, tag: 'Estrella' },
    { name: 'Solomillo al romero', desc: 'Con patatas panaderas y salsa de vinos', price: 28 },
    { name: 'Pasta trufada', desc: 'Tagliatelle, crema de trufa y parmesano', price: 19, tag: 'Vegetariano' },
  ],
  Postres: [
    { name: 'Crema catalana', desc: 'Caramelizada al momento con azúcar moreno', price: 8 },
    { name: 'Tarta de chocolate', desc: 'Con helado de vainilla de Madagascar', price: 9, tag: 'Favorito' },
    { name: 'Helado artesanal', desc: 'Dos bolas: pistacho y salsa de higo', price: 7 },
  ],
  Bebidas: [
    { name: 'Vino de la casa', desc: 'Copa de Rioja crianza · D.O. Rioja', price: 7 },
    { name: 'Agua mineral', desc: 'Botella 500 ml, con o sin gas', price: 3 },
    { name: 'Café exprés', desc: 'Tueste natural, servido con azúcar', price: 3 },
  ],
};

const REVIEWS = [
  { name: 'Ana Paredes', text: 'La paella increíble y el trato aún mejor. Reservamos para cada cumpleaños.', stars: 5 },
  { name: 'José Mena', text: 'Ambiente acogedor, carta de temporada y precios muy razonables.', stars: 5 },
  { name: 'Sofía López', text: 'Postres de otro nivel. La crema catalana es la mejor de la ciudad.', stars: 4 },
];

const GALLERY = ['galleryA', 'galleryB', 'galleryC', 'galleryD'] as const;

export function RestaurantExample({ brand }: { brand: StudioBrand }) {
  const [category, setCategory] = useState<Category>('Platos');
  const [booked, setBooked] = useState(false);
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState('Sáb 22');
  const [time, setTime] = useState('20:00');
  const [review, setReview] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const currentReview = REVIEWS[review]!;

  const addDish = (name: string) => { setCart((list) => [...list, name]); setBooked(false); };

  return (
    <div className={s.site}>
      <header className={s.nav}>
        <DemoBrand brand={brand} />
        <nav className={s.navLinks}><span>Carta</span><span>Galería</span><span>Nosotros</span><span>Reseñas</span></nav>
        <button className={s.pillBtn} onClick={() => setBooked(true)}>Reservar mesa</button>
      </header>

      <section className={s.restHero}>
        <div>
          <span className={s.kicker}>COCINA MEDITERRÁNEA · DESDE 2014</span>
          <h2>El sabor de <em>estar en casa</em>.</h2>
          <p>Ingredientes de temporada, fuego lento y una carta que cambia con el mercado. Cada plato cuenta una historia.</p>
          <div className={s.row}>
            <button className={s.cta} onClick={() => setBooked(true)}>Reservar ahora</button>
            <button className={s.ghostBtn} onClick={() => setFavorite((v) => !v)}>
              <Heart size={13} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Guardado' : 'Guardar'}
            </button>
            <span className={s.rating}><Star size={13} fill="currentColor" /> 4.9 · 320 reseñas</span>
          </div>
        </div>
        <div className={s.foodArt}><span className={s.plate} /><span className={s.fork} /></div>
      </section>

      <section className={s.restInfo}>
        <span><Clock size={13} /> Mar–Dom · 12:00–23:30</span>
        <span><MapPin size={13} /> Calle Mayor 24, Centro</span>
        <span><Phone size={13} /> +58 412 555 0199</span>
        <span><Users size={13} /> Grupos y eventos</span>
      </section>

      <section className={s.galleryStrip}>
        <div className={s.galleryHead}><span className={s.kicker}>GALERÍA</span><h3>Un vistazo a nuestra mesa</h3></div>
        <div className={s.galleryGrid}>
          {GALLERY.map((item, i) => (
            <div key={item} className={s[item]}><Camera size={15} /><small>{['La terraza', 'Plato del día', 'Barra', 'Postres'][i]}</small></div>
          ))}
        </div>
      </section>

      <section className={s.menuSection}>
        <div className={s.menuHead}>
          <div><span className={s.kicker}>NUESTRA CARTA</span><h3>Hecha para compartir</h3></div>
          <div className={s.menuTabs}>
            {CATEGORIES.map((item) => (
              <button key={item} className={category === item ? s.menuTabActive : ''} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className={s.menuList}>
          {MENU[category].map((dish) => (
            <article key={dish.name}>
              <div><strong>{dish.name} {dish.tag && <em className={s.dishTag}>{dish.tag}</em>}</strong><small>{dish.desc}</small></div>
              <div className={s.dishActions}><b>${dish.price}</b><button onClick={() => addDish(dish.name)} aria-label={`Añadir ${dish.name}`}><ShoppingBag size={13} /></button></div>
            </article>
          ))}
        </div>
        {cart.length > 0 && (
          <div className={s.cartStrip} role="status">
            <Check size={14} /> {cart.length} plato(s) añadido(s): {cart.slice(-3).join(', ')}
            <button onClick={() => setCart([])}>Vaciar pedido</button>
          </div>
        )}

        {booked && (
          <div className={s.booking} role="status">
            <div>
              <Check size={15} /> ¡Mesa reservada para {people} {people === 1 ? 'persona' : 'personas'}!
              <small>{date} · {time} · Te confirmaremos por WhatsApp en unos minutos.</small>
            </div>
            <div className={s.bookingFields}>
              <select value={date} onChange={(e) => setDate(e.target.value)} aria-label="Día">
                <option>Sáb 22</option><option>Dom 23</option><option>Lun 24</option><option>Mar 25</option>
              </select>
              <select value={time} onChange={(e) => setTime(e.target.value)} aria-label="Hora">
                <option>12:30</option><option>14:00</option><option>20:00</option><option>21:30</option>
              </select>
              <button className={s.ghostBtn} onClick={() => setPeople((n) => Math.max(1, n - 1))}>−</button>
              <b>{people}</b>
              <button className={s.ghostBtn} onClick={() => setPeople((n) => Math.min(10, n + 1))}>+</button>
              <button className={s.cta} onClick={() => setBooked(false)}>Confirmar</button>
            </div>
          </div>
        )}
      </section>

      <section className={s.aboutStrip}>
        <div><span className={s.kicker}>NOSOTROS</span><h3>Fuego lento y producto honesto.</h3></div>
        <p>Somos un equipo pequeño apasionado por la cocina de mercado. Trabajamos con productores locales y cambiamos la carta cada semana según lo que da la tierra. Sin atajos, sin congelados, sin sorpresas.</p>
        <div className={s.aboutStats}>
          <span><b>12</b><small>años de historia</small></span>
          <span><b>4.9</b><small>valoración media</small></span>
          <span><b>30</b><small>platos locales</small></span>
        </div>
      </section>

      <section className={s.reviewSection}>
        <div className={s.reviewHead}>
          <div><span className={s.kicker}>RESEÑAS</span><h3>Quienes ya vinieron</h3></div>
          <div className={s.reviewNav}>
            <button onClick={() => setReview((r) => (r - 1 + REVIEWS.length) % REVIEWS.length)} aria-label="Anterior"><ChevronLeft size={15} /></button>
            <button onClick={() => setReview((r) => (r + 1) % REVIEWS.length)} aria-label="Siguiente"><ChevronRight size={15} /></button>
          </div>
        </div>
        <blockquote className={s.reviewCard}>
          <Quote size={20} className={s.quoteIcon} />
          <p>“{currentReview.text}”</p>
          <div className={s.reviewAuthor}>
            <span className={s.reviewAvatar}>{currentReview.name.split(' ').map((w) => w[0]).join('')}</span>
            <div><strong>{currentReview.name}</strong><small>Cliente verificado</small></div>
            <span className={s.stars}>{Array.from({ length: currentReview.stars }, (_, i) => <Star size={11} fill="currentColor" key={i} />)}{currentReview.stars < 5 && <StarHalf size={11} fill="currentColor" />}</span>
          </div>
          <div className={s.reviewDots}>{REVIEWS.map((_, i) => <button key={i} className={i === review ? s.dotActive : ''} onClick={() => setReview(i)} aria-label={`Reseña ${i + 1}`} />)}</div>
        </blockquote>
      </section>

      <section className={s.socialStrip}><AtSign size={15} /> Síguenos en @casamoments · comparte tu plato con #CasaMenta</section>

      <DemoFooter brand={brand} />
    </div>
  );
}
