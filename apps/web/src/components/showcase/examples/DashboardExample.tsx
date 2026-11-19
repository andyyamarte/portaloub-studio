'use client';

import { useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, CreditCard, Download, Eye,
  LayoutDashboard, Menu, MoreHorizontal, Package, Settings, ShoppingCart, Users, X,
} from 'lucide-react';
import type { StudioBrand } from '@/domain/entities/page-type';
import { DemoBrand, DemoFooter } from './DemoChrome';
import s from './examples.module.css';

const RANGES = ['7d', '30d', '90d'] as const;
type Range = (typeof RANGES)[number];

const DATA: Record<Range, { bars: number[]; revenue: string; users: string; conversion: string; orders: string; change: string }> = {
  '7d': { bars: [42, 58, 35, 72, 64, 88, 76], revenue: '$24.580', users: '3.240', conversion: '4.8%', orders: '312', change: '+8.2%' },
  '30d': { bars: [36, 48, 62, 45, 78, 69, 92], revenue: '$98.320', users: '12.870', conversion: '5.6%', orders: '1.284', change: '+12.4%' },
  '90d': { bars: [52, 44, 68, 81, 60, 94, 86], revenue: '$284.900', users: '36.110', conversion: '6.2%', orders: '3.870', change: '+18.7%' },
};

const TRANSACTIONS = [
  { id: '#1284', client: 'María Gómez', plan: 'Pro', amount: '$599', status: 'Pagado', time: 'Hace 4 min' },
  { id: '#1283', client: 'Carlos Rivas', plan: 'Elite', amount: '$999', status: 'Pagado', time: 'Hace 18 min' },
  { id: '#1282', client: 'Lucía Fernández', plan: 'Esencial', amount: '$299', status: 'Pendiente', time: 'Hace 1 h' },
  { id: '#1281', client: 'Studio Norte', plan: 'Pro', amount: '$599', status: 'Pagado', time: 'Hace 3 h' },
];

const NAV = [
  { icon: LayoutDashboard, label: 'Resumen' },
  { icon: ShoppingCart, label: 'Pedidos' },
  { icon: Users, label: 'Clientes' },
  { icon: Activity, label: 'Analítica' },
  { icon: CreditCard, label: 'Facturación' },
  { icon: Settings, label: 'Ajustes' },
];

export function DashboardExample({ brand }: { brand: StudioBrand }) {
  const [range, setRange] = useState<Range>('30d');
  const [visible, setVisible] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Resumen');
  const [filter, setFilter] = useState<'Todos' | 'Pagado' | 'Pendiente'>('Todos');
  const data = DATA[range];

  const rows = TRANSACTIONS.filter((t) => filter === 'Todos' || t.status === filter);

  return (
    <div className={s.site}>
      <header className={s.nav}>
        <div className={s.row}>
          <button className={s.iconBtn} onClick={() => setMenuOpen((v) => !v)} aria-label="Menú"><Menu size={14} /></button>
          <DemoBrand brand={brand} />
        </div>
        <div className={s.row}>
          <button className={s.iconBtn} aria-label="Descargar informe" onClick={() => setVisible(true)}><Download size={14} /></button>
          <div className={s.notifWrap}>
            <button className={s.iconBtn} aria-label="Notificaciones" onClick={() => setNotifications((v) => !v)}>
              <Bell size={14} />{!notifications && <i className={s.notifDot} />}
            </button>
            {notifications && (
              <div className={s.notifPanel}>
                <strong>Notificaciones</strong>
                <span><b>Nuevo pedido</b> #1284 por $599</span>
                <span><b>Meta alcanzada</b> +12.4% este mes</span>
                <button onClick={() => setNotifications(false)}>Marcar como leídas</button>
              </div>
            )}
          </div>
          <button className={s.iconBtn} aria-label="Cambiar visibilidad" onClick={() => setVisible((v) => !v)}><Eye size={14} /></button>
          <span className={s.userChip}>PO</span>
        </div>
      </header>

      <div
        className={s.dashLayout}
        onClick={(event) => {
          if (menuOpen && event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <aside className={`${s.sidebar} ${menuOpen ? s.sidebarOpen : ''}`}>
          <button className={s.sidebarClose} onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X size={14} /></button>
          {NAV.map(({ icon: Icon, label }) => (
            <button key={label} className={activeNav === label ? s.sideActive : ''} onClick={() => { setActiveNav(label); setMenuOpen(false); }}>
              <Icon size={14} /> {label}
            </button>
          ))}
          <div className={s.sideGoal}>
            <span>Meta mensual</span>
            <b>78% completado</b>
            <div className={s.progressTrack}><span style={{ width: '78%' }} /></div>
            <small>$98.320 de $125.000</small>
          </div>
        </aside>

        <div className={s.dashMain}>
          <section className={s.dashHead}>
            <div>
              <span className={s.kicker}>{activeNav.toUpperCase()}</span>
              <h2>Buenos días, PortalOub 👋</h2>
              <p>Así va tu negocio hoy. Todo en tiempo real.</p>
            </div>
            <div className={s.rangeTabs}>
              {RANGES.map((item) => (
                <button key={item} className={range === item ? s.rangeActive : ''} onClick={() => setRange(item)}>{item}</button>
              ))}
            </div>
          </section>

          <section className={s.kpiGrid}>
            <article><small>Ingresos</small><strong>{visible ? data.revenue : '••••••'}</strong><span className={s.up}><ArrowUpRight size={12} /> {data.change}</span></article>
            <article><small>Usuarios</small><strong>{visible ? data.users : '••••••'}</strong><span className={s.up}><ArrowUpRight size={12} /> 8.1%</span></article>
            <article><small>Conversión</small><strong>{visible ? data.conversion : '••••••'}</strong><span className={s.up}><ArrowUpRight size={12} /> 2.3%</span></article>
            <article><small>Pedidos</small><strong>{visible ? data.orders : '••••••'}</strong><span className={s.down}><ArrowDownRight size={12} /> 1.2%</span></article>
          </section>

          <section className={s.dashCharts}>
            <div className={s.chartCard}>
              <div className={s.chartHead}><strong>Rendimiento</strong><span>Actualizado hace 2 min</span></div>
              <div className={s.bars}>
                {data.bars.map((height, index) => (
                  <div className={s.barCol} key={index}>
                    <span style={{ height: `${height}%` }} />
                    <small>{['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.chartCard}>
              <div className={s.chartHead}><strong>Canales</strong><span>{range}</span></div>
              <div className={s.donut}><span>68%<small>orgánico</small></span></div>
              <div className={s.legend}>
                <span><i style={{ background: '#34D399' }} /> Orgánico 68%</span>
                <span><i style={{ background: '#22D3EE' }} /> Redes 21%</span>
                <span><i style={{ background: '#8B5CF6' }} /> Otros 11%</span>
              </div>
            </div>
          </section>

          <section className={s.dashCharts}>
            <div className={s.chartCard}>
              <div className={s.chartHead}><strong>Productos top</strong><span>Unidades vendidas</span></div>
              <div className={s.topProducts}>
                <span><i style={{ background: '#8B5CF6' }} /> Landing Pro <b>184</b></span>
                <span><i style={{ background: '#22D3EE' }} /> Elite <b>96</b></span>
                <span><i style={{ background: '#F59E0B' }} /> Esencial <b>72</b></span>
              </div>
            </div>
            <div className={s.chartCard}>
              <div className={s.chartHead}><strong>Objetivos</strong><span>Q1 2026</span></div>
              <div className={s.goals}>
                <div><span>Ventas</span><b>78%</b><div className={s.progressTrack}><span style={{ width: '78%' }} /></div></div>
                <div><span>Visitas</span><b>64%</b><div className={s.progressTrack}><span style={{ width: '64%' }} /></div></div>
                <div><span>Retención</span><b>91%</b><div className={s.progressTrack}><span style={{ width: '91%' }} /></div></div>
              </div>
            </div>
          </section>

          <section className={s.tableCard}>
            <div className={s.chartHead}>
              <strong>Transacciones recientes</strong>
              <div className={s.tableFilters}>
                {(['Todos', 'Pagado', 'Pendiente'] as const).map((item) => (
                  <button key={item} className={filter === item ? s.filterActive : ''} onClick={() => setFilter(item)}>{item}</button>
                ))}
              </div>
            </div>
            <div className={s.tableHeader}><span>Pedido</span><span>Cliente</span><span>Plan</span><span>Importe</span><span>Estado</span><span></span></div>
            {rows.map((row) => (
              <div className={s.transactionRow} key={row.id}>
                <span>{row.id}</span><span>{row.client}</span><span>{row.plan}</span><b>{row.amount}</b>
                <span className={row.status === 'Pagado' ? s.statusPaid : s.statusPending}>{row.status}</span>
                <span className={s.tableTime}>{row.time}</span>
                <button className={s.iconBtn} aria-label="Más opciones"><MoreHorizontal size={13} /></button>
              </div>
            ))}
          </section>

          <DemoFooter brand={brand} />
        </div>
      </div>
    </div>
  );
}
