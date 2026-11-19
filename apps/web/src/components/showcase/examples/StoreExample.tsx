'use client';

import { useState } from 'react';
import {
  Check, ChevronRight, Heart, Mail, Minus, Plus, RotateCcw, Search,
  ShoppingBag, Star, Trash2, Truck,
} from 'lucide-react';
import type { StudioBrand } from '@/domain/entities/page-type';
import { DemoBrand, DemoFooter } from './DemoChrome';
import s from './examples.module.css';

type Product = {
  id: number; name: string; category: string; price: number; oldPrice?: number;
  art: string; tone: string; rating: number; reviews: number;
};

const PRODUCTS: readonly Product[] = [
  { id: 1, name: 'Sneaker Nova', category: 'Calzado', price: 89, oldPrice: 119, art: 'wave', tone: '#8B5CF6', rating: 5, reviews: 128 },
  { id: 2, name: 'Mochila Orbit', category: 'Accesorios', price: 64, art: 'box', tone: '#22D3EE', rating: 4, reviews: 86 },
  { id: 3, name: 'Audífonos Aura', category: 'Tecnología', price: 129, oldPrice: 159, art: 'ring', tone: '#F59E0B', rating: 5, reviews: 214 },
  { id: 4, name: 'Camiseta Studio', category: 'Ropa', price: 35, art: 'tee', tone: '#FB7185', rating: 4, reviews: 57 },
];

const CATEGORIES = ['Todos', 'Calzado', 'Accesorios', 'Tecnología', 'Ropa'] as const;

export function StoreExample({ brand }: { brand: StudioBrand }) {
  const [cart, setCart] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Todos');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const visible = PRODUCTS.filter(
    (p) => (category === 'Todos' || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const add = (id: number) => { setCart((current) => [...current, id]); setDone(false); };
  const removeLast = (id: number) => setCart((current) => { const index = current.lastIndexOf(id); return index < 0 ? current : [...current.slice(0, index), ...current.slice(index + 1)]; });
  const total = cart.reduce((sum, id) => sum + (PRODUCTS.find((item) => item.id === id)?.price ?? 0), 0);
  const toggleFav = (id: number) => setFavorites((list) => list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  return (
    <div className={s.site}>
      <header className={s.nav}>
        <DemoBrand brand={brand} />
        <div className={s.searchBox}><Search size={13} /> <input placeholder="Buscar productos…" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
        <div className={s.row}>
          <button className={s.iconBtn} aria-label="Favoritos" onClick={() => setCategory('Todos')}>
            <Heart size={14} fill={favorites.length ? 'currentColor' : 'none'} />
          </button>
          <div className={s.cartBtn}><ShoppingBag size={15} /> Carrito{cart.length > 0 && <span className={s.cartCount}>{cart.length}</span>}</div>
        </div>
      </header>

      <div className={s.shippingBar}><Truck size={13} /> Envío gratis en pedidos desde $80 · Devoluciones en 30 días</div>

      <section className={s.storeHero}>
        <div>
          <span className={s.kicker}>NUEVA COLECCIÓN</span>
          <h2>Estilo que se <em>lleva bien</em>.</h2>
          <p>Piezas seleccionadas, materiales premium y envío gratis desde $80. Hecho para durar.</p>
          <div className={s.row}>
            <button className={s.cta} onClick={() => document.querySelector(`#${s.productGrid}`)?.scrollIntoView({ behavior: 'smooth' })}>Ver colección <ChevronRight size={14} /></button>
            <span className={s.rating}><Star size={13} fill="currentColor" /> 4.8 · 480 reseñas</span>
          </div>
        </div>
        <div className={s.storeHeroArt}><span /><span /><span /></div>
      </section>

      <div className={s.storeToolbar}>
        <strong>Productos destacados</strong>
        <span>Mostrando {visible.length} de {PRODUCTS.length} artículos</span>
      </div>

      <div className={s.categoryTabs}>
        {CATEGORIES.map((item) => (
          <button key={item} className={category === item ? s.categoryActive : ''} onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>

      <section className={s.productGrid} id={s.productGrid}>
        {visible.map((product) => (
          <article className={s.product} key={product.id}>
            <div className={s.productArt} style={{ background: product.tone }}>
              <span className={`${s.artShape} ${s[product.art]}`} />
              <span className={s.productTag}>{product.oldPrice ? '−25%' : 'Nuevo'}</span>
              <button className={`${s.favBtn} ${favorites.includes(product.id) ? s.favOn : ''}`} onClick={() => toggleFav(product.id)} aria-label="Favorito">
                <Heart size={13} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <small>{product.category}</small>
            <strong>{product.name}</strong>
            <span className={s.productRating}><Star size={10} fill="currentColor" /> {product.rating}.0 <i>({product.reviews})</i></span>
            <div className={s.productFoot}>
              <b>${product.price} {product.oldPrice && <del>${product.oldPrice}</del>}</b>
              <button onClick={() => add(product.id)} aria-label={`Añadir ${product.name}`}><ShoppingBag size={13} /> Añadir</button>
            </div>
          </article>
        ))}
        {visible.length === 0 && <p className={s.emptyState}>No encontramos productos con “{query}”.</p>}
      </section>

      {cart.length > 0 && (
        <section className={s.cartPanel} role="status">
          <div><Check size={15} /> {cart.length} {cart.length === 1 ? 'artículo' : 'artículos'} · Total <b>${total}</b> {total >= 80 && <span className={s.freeShip}>¡Envío gratis!</span>}</div>
          <div className={s.cartItems}>
            {[...new Set(cart)].map((id) => (
              <span key={id}>{PRODUCTS.find((p) => p.id === id)?.name} ×{cart.filter((c) => c === id).length}
                <button onClick={() => removeLast(id)} aria-label="Quitar uno"><Minus size={10} /></button>
              </span>
            ))}
          </div>
          <div className={s.row}>
            <button className={s.ghostBtn} onClick={() => setCart([])}><Trash2 size={13} /> Vaciar</button>
            <button className={s.ghostBtn} onClick={() => add(1)}><Plus size={13} /> Añadir más</button>
            <button className={s.cta} onClick={() => setDone(true)}>Finalizar compra</button>
          </div>
          {done && <p className={s.success}>¡Compra simulada! Gracias por probar la tienda de {brand.name}.</p>}
        </section>
      )}

      <section className={s.newsletter}>
        <Mail size={20} />
        <div><h4>Únete al club</h4><p>10% de descuento en tu primera compra + novedades.</p></div>
        <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
          <input type="email" required placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className={s.cta} type="submit">Suscribirme</button>
        </form>
        {subscribed && <p className={s.success} role="status"><Check size={13} /> ¡Listo! Tu cupón está en camino.</p>}
      </section>

      <section className={s.valueRow}>
        <span><RotateCcw size={14} /> Devoluciones fáciles</span>
        <span><Truck size={14} /> Envío 24–48 h</span>
        <span><Check size={14} /> Pago seguro</span>
      </section>

      <DemoFooter brand={brand} />
    </div>
  );
}
