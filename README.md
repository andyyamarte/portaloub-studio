# PortalOub — Estudio Web Interactivo

Portfolio demostrativo con **Next.js 16 + React 19**, **Nest.js 11**, **GSAP** y **CSS moderno** (scroll-driven animations, View Transitions, `@starting-style` y container queries).

La home muestra la hero **«Soy PortalOub. ¿Necesitas una página web?»**, seis tarjetas en miniatura y, al hacer clic, se abre una **demo interactiva** del tipo de página elegida. Todas las demos llevan la marca PortalOub.

## Ejemplos incluidos

| Slug | Demo | Interacciones |
| --- | --- | --- |
| `landing-page` | Landing de conversión | CTA con confirmación, contador social |
| `one-page` | One page narrativa | Navegación anclada con smooth scroll interno |
| `tienda-online` | E-commerce | Carrito reactivo, vaciado y checkout simulado |
| `dashboard` | Panel de métricas | Tabs 7d/30d/90d, gráficas y ocultar datos |
| `restaurante` | Carta y reservas | Categorías, reserva y select de comensales |
| `artistas` | Portal de artista | Reproductor, ecualizador, tracks y gira |

Cada demo también es navegable de forma directa en `/showcase/<slug>`.

## Estructura (arquitectura limpia)

```
open code/
├── packages/contracts/          # DOMAIN: entidades, puerto y seed compartido
│   └── src/
│       ├── domain/page-type.ts
│       ├── domain/page-type-repository.ts   # puerto (inversión de dependencias)
│       └── data/page-types.ts               # catálogo único de datos
├── apps/api/                    # NEST.JS
│   └── src/
│       ├── application/use-cases/           # lógica de negocio
│       ├── infrastructure/repositories/     # adaptador en memoria
│       ├── interfaces/http/                 # controllers
│       ├── app.module.ts
│       └── main.ts
└── apps/web/                    # NEXT.JS
    └── src/
        ├── domain/                          # reexport del dominio
        ├── application/use-cases/
        ├── infrastructure/
        │   ├── cache/tags.ts
        │   ├── repositories/                # adaptador HTTP → API
        │   └── container.ts                 # composition root
        ├── components/
        │   ├── hero/  catalog/  home/  preview/
        │   └── showcase/                    # demos interactivas
        └── app/
            ├── page.tsx
            ├── showcase/[slug]/page.tsx
            └── api/                         # BFF + revalidación
```

Las capas `Application` no importan React ni Nest; dependen solo del puerto `PageTypeRepository`. Cambiar la fuente de datos no requiere tocar los casos de uso.

## Caché optimizado

- **Nest.js**: `CacheModule` + `CacheInterceptor` global (TTL configurable, máx. 100 entradas), `ETag` y `Cache-Control: public, max-age=60, stale-while-revalidate=300`. `/api/health` usa `no-store`.
- **Next.js**: Data Cache con `revalidate: 3600` y tags (`page-types`, `page-type:<slug>`), ISR en home y en las 6 rutas de showcase, `React.cache()` para deduplicar peticiones dentro del render.
- **Imágenes**: SVG locales servidas con `Cache-Control: public, max-age=31536000, immutable`.
- **Invalidación**: `POST /api/revalidate` con header `x-revalidate-secret`.
- **Bundle**: GSAP se importa de forma dinámica solo en la hero.

## Envío real de correos

El formulario de contacto **ya no usa `mailto:`**: envía los datos a `POST /api/contact` (BFF de Next) → `POST /api/contact` (Nest) → Gmail SMTP con `nodemailer`.

Flujo limpio:

```
ContactModal (React) → /api/contact (Next BFF) → /api/contact (Nest)
  → SendContactMessage (Application) → MailGateway (Puerto)
  → GmailMailGateway (Infrastructure) → Gmail
```

**Configuración única:** habilita la verificación en dos pasos en tu cuenta de Google, genera una **contraseña de aplicación** y guárdala en `apps/api/.env` como `GMAIL_APP_PASSWORD`. El remitente y el destinatario se definen con `GMAIL_USER` y `CONTACT_EMAIL`. No compartas esa contraseña en el chat ni en el repositorio.

## Arranque

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:3001/api/page-types
- Health: http://localhost:3001/api/health

`npm run dev` compila primero `@portaloub/contracts` y luego levanta ambos servidores con `concurrently`.

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Contracts + API (watch) + Web (dev) |
| `npm run build` | Compila contracts, API y web (producción) |
| `npm start` | Sirve builds de producción |
| `npm run typecheck` | TypeScript en los tres workspaces |

## Configuración

Copia `.env.example` y pon las variables en `apps/web/.env.local` (web) y `apps/api/.env` (API, cargadas por el entorno de Node):

```bash
API_INTERNAL_URL=http://127.0.0.1:3001        # usada por la web para hablar con Nest
WEB_ORIGIN=http://localhost:3000               # CORS del API (separar con comas)
CACHE_TTL_MS=300000                            # TTL en milisegundos del API
CONTACT_EMAIL=portaloub@gmail.com              # correo que recibe los mensajes
GMAIL_USER=portaloub@gmail.com                 # cuenta que envía por SMTP
GMAIL_APP_PASSWORD=tu-contraseña-de-aplicacion # contraseña de aplicación de Google
PORT=3001                                      # puerto del API
REVALIDATE_SECRET=dev-secret                   # secreto del webhook
```

## Atajos de teclado

- `Esc` cierra la demo interactiva.
- Las tarjetas soportan navegación por teclado (Enter / Espacio).
- Se respeta `prefers-reduced-motion`.

## Abrir en VS Code

```bash
code .
```

Incluye `.vscode/settings.json`, extensiones recomendadas y configuraciones de debug para API y Web.
