'use client';

import { useState } from 'react';
import {
  AtSign, CalendarDays, Check, Disc3, Globe, Heart, Mail, Music2, Pause,
  Play, Plus, Share2, ShoppingBag, SkipBack, SkipForward, Star,
} from 'lucide-react';
import type { StudioBrand } from '@/domain/entities/page-type';
import { DemoBrand, DemoFooter } from './DemoChrome';
import s from './examples.module.css';

const TRACKS = ['Luces de neón', 'Ciudad dormida', 'Otro universo', 'Amanecer'];
const SHOWS = [
  { date: '12 MAR', city: 'Caracas', venue: 'Teatro municipal', status: 'Entradas' },
  { date: '28 MAR', city: 'Bogotá', venue: 'Sala capital', status: 'Últimas' },
  { date: '04 ABR', city: 'Madrid', venue: 'Sala Lua', status: 'Agotado' },
  { date: '18 ABR', city: 'Barcelona', venue: 'Razzmatazz 2', status: 'Entradas' },
];
const MERCH = [
  { name: 'Camiseta Nocturna', price: 28, art: 'merchA' },
  { name: 'Vinilo EP', price: 32, art: 'merchB' },
  { name: 'Gorra PO', price: 22, art: 'merchC' },
];
const ALBUMS = [
  { name: 'Nocturno EP', year: '2026', type: 'EP · 4 tracks', tone: 'albumA' },
  { name: 'Ciudad dormida', year: '2025', type: 'Álbum · 10 tracks', tone: 'albumB' },
  { name: 'Primer vuelo', year: '2024', type: 'Single · 1 track', tone: 'albumC' },
];

export function ArtistExample({ brand }: { brand: StudioBrand }) {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [progress, setProgress] = useState(24);
  const [following, setFollowing] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [shared, setShared] = useState(false);

  const next = () => { setTrack((t) => (t + 1) % TRACKS.length); setProgress(0); };
  const prev = () => { setTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length); setProgress(0); };

  return (
    <div className={s.site}>
      <header className={s.nav}>
        <DemoBrand brand={brand} />
        <nav className={s.navLinks}><span>Música</span><span>Discografía</span><span>Gira</span><span>Merch</span></nav>
        <button className={s.pillBtn} onClick={() => setFollowing((v) => !v)}>
          {following ? <><Check size={13} /> Siguiendo</> : <><Plus size={13} /> Seguir</>}
        </button>
      </header>

      <section className={s.artistHero}>
        <div className={s.vinyl}>
          <span className={`${s.vinylDisc} ${playing ? s.vinylSpin : ''}`} />
          <span className={s.vinylLabel}>PO</span>
        </div>
        <div className={s.artistCopy}>
          <span className={s.kicker}>NUEVO EP · 2026 · PORTALOUB</span>
          <h2>Sonido para <em>los que no duermen</em>.</h2>
          <p>Cuatro canciones, una noche infinita. Synth envolvente, letras honestas y una voz que se queda contigo.</p>
          <div className={s.row}>
            <button className={s.cta} onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? 'Pausar' : 'Reproducir'}
            </button>
            <button className={s.ghostBtn} onClick={() => setShared(true)}><Share2 size={14} /> Compartir</button>
            <span className={s.rating}><Star size={13} fill="currentColor" /> 4.8 · 1.2K oyentes</span>
          </div>
          {shared && <p className={s.success} role="status"><Check size={13} /> Enlace copiado al portapapeles.</p>}
        </div>
      </section>

      <section className={s.playerCard}>
        <button className={s.playRound} onClick={prev} aria-label="Anterior"><SkipBack size={14} /></button>
        <button className={s.playRound} onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pausar' : 'Reproducir'}>
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button className={s.playRound} onClick={next} aria-label="Siguiente"><SkipForward size={14} /></button>
        <div className={s.trackInfo}>
          <Music2 size={13} />
          <div><strong>{TRACKS[track]}</strong><small>PortalOub · EP Nocturno</small></div>
        </div>
        <div className={`${s.equalizer} ${playing ? s.equalizerOn : ''}`} aria-hidden>
          <i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className={s.progressWrap}>
          <div className={s.progressTrack}><span style={{ width: `${progress}%` }} /></div>
          <span className={s.trackTime}>0:{String(12 + track * 7).padStart(2, '0')} / 3:45</span>
        </div>
      </section>

      <section className={s.trackList}>
        {TRACKS.map((name, index) => (
          <button key={name} className={track === index ? s.trackActive : ''} onClick={() => { setTrack(index); setPlaying(true); setProgress(0); }}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{name}</strong>
            <span className={s.trackPlays}>{['182K', '96K', '74K', '58K'][index]} reproducciones</span>
            <small>3:{String(12 + index * 7).padStart(2, '0')}</small>
          </button>
        ))}
      </section>

      <section className={s.albumSection}>
        <div className={s.menuHead}><h3><Disc3 size={16} /> Discografía</h3><span>Ver todo →</span></div>
        <div className={s.albumGrid}>
          {ALBUMS.map((album) => (
            <div key={album.name}>
              <span className={s[album.tone]}><Disc3 size={26} /></span>
              <strong>{album.name}</strong>
              <small>{album.type}</small>
              <em>{album.year}</em>
            </div>
          ))}
        </div>
      </section>

      <section className={s.shows}>
        <div className={s.menuHead}><h3><CalendarDays size={15} /> Próximas fechas</h3><span>Todos los shows →</span></div>
        {SHOWS.map((show) => (
          <div className={s.showRow} key={show.city}>
            <b>{show.date}</b><strong>{show.city}</strong><small>{show.venue}</small>
            <span className={show.status === 'Agotado' ? s.soldOut : ''}>{show.status === 'Entradas' ? 'Entradas →' : show.status}</span>
          </div>
        ))}
      </section>

      <section className={s.merchSection}>
        <div className={s.menuHead}><div><span className={s.kicker}>MERCH</span><h3>Lleva la música contigo</h3></div><ShoppingBag size={18} /></div>
        <div className={s.merchGrid}>
          {MERCH.map((item) => (
            <div key={item.name}>
              <span className={s[item.art]}><ShoppingBag size={20} /></span>
              <strong>{item.name}</strong>
              <b>${item.price}</b>
              <button className={s.ghostBtn} onClick={() => setCart((list) => [...list, item.name])}><Plus size={12} /> Añadir</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className={s.cartStrip} role="status"><Check size={14} /> {cart.length} artículo(s) en tu bolsa · ${cart.reduce((sum, n) => sum + (MERCH.find((m) => m.name === n)?.price ?? 0), 0)} <button onClick={() => setCart([])}>Vaciar</button></div>
        )}
      </section>

      <section className={s.newsletter}>
        <Mail size={20} />
        <div><h4>Newsletter nocturna</h4><p>Estrenos, fechas y detrás de cámaras. Sin spam.</p></div>
        <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
          <input type="email" required placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className={s.cta} type="submit">Suscribirme</button>
        </form>
        {subscribed && <p className={s.success} role="status"><Check size={13} /> ¡Bienvenido a la lista!</p>}
      </section>

      <section className={s.socialStrip}><AtSign size={15} /> @portaloub.music <Globe size={15} /> /portaloub · <Heart size={13} /> Gracias por escuchar</section>

      <DemoFooter brand={brand} />
    </div>
  );
}
