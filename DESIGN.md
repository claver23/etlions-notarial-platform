# DESIGN.md — ETLIONS NOTARIAL · Portal del cliente

> Generado al cierre de `/impeccable new-work`. Documenta el mundo visual construido para la primera superficie del producto: el portal del cliente final.

## Dirección (brief-pinned, sin dice-roll)

El usuario fijó la identidad visual completa en el brief de `shape`. No se exploraron direcciones alternativas: un brief pinneado gana siempre sobre la generación de conceptos.

- **THESIS**: ya no es "una notaría", es un solo expediente digital que cruza dos roles; el portal hace tangible la fe pública sin la sala de espera.
- **STORY**: el cliente entiende que puede resolver su trámite sin ir presencialmente, compara notarías con precio/tiempo visibles, y firma desde el celular con confianza.
- **FORM**: cards blancas + badges circulares + timeline, aplicado con disciplina en las 5 pantallas.

## Tokens (`src/styles.css`, Tailwind v4 `@theme`)

| Token | Valor | Uso |
|---|---|---|
| `--color-navy-900` | `#0A2540` | texto de autoridad, headers, CTA secundario |
| `--color-coral-500` | `#E67E50` | CTA primario, acentos, badges activos |
| `--color-sand-50/100` | `#F5F7FA` / `#EEF1F5` | fondos secundarios, bordes de card |
| `--color-ink-700/500/300` | `#1F2937` / `#6B7280` / `#9CA3AF` | cuerpo, texto secundario, texto deshabilitado |
| `--color-status-*` | ver abajo | ciclo de vida del expediente |
| `--font-sans` | Inter | pinneada por el cliente, no es default — hallazgo del detector suprimido a propósito (`.impeccable/config.json`) |

Estados semánticos del expediente (badge + timeline comparten la misma fuente de verdad en `core/services/estado.util.ts`):

`borrador` gris · `en_revision` slate · `observado` ámbar · `aprobado` navy · `firmado` coral · `legalizado` verde.

## Componentes compartidos

- `shared/site-header`, `shared/site-footer` — chrome de `MainLayout`, con wordmark navy/coral y logo real del cliente.
- `shared/status-badge` — píldora de color por estado, una sola fuente de verdad.
- `shared/progress-timeline` — línea vertical con nodos numerados; el estado `observado` se renderiza como alerta ámbar sobre el nodo "En revisión" (no como paso adicional), porque es una desviación, no un avance.
- Iconografía: SVG outline inline en cada plantilla (ningún ícono relleno, por restricción explícita del cliente).

## Pantallas construidas

1. **Landing / catálogo** (`features/catalog`) — hero con propuesta de valor en texto (no grid de 3 iconos genérico), buscador + chips de categoría, grid de cards de trámite, estado vacío con CTA de recuperación.
2. **Detalle del trámite** (`features/tramite-detail`) — requisitos, precio/demora, notarías comparables, CTA único sticky "Iniciar trámite".
3. **Mis trámites** (`features/mis-tramites`) — lista de expedientes con `app-status-badge`, estado vacío con CTA a catálogo.
4. **Detalle del expediente** (`features/expediente-detail`) — timeline de avance, acción pendiente destacada, documentos con estado individual y observaciones inline.
5. **Firma vía QR** (`features/firma`) — sin header/footer de navegación (solo logo + indicador "conexión segura"), documento + checkbox de conformidad + CTA único. Cubre `lista → firmando → firmada` y el estado crítico `expirada` (QR vencido).

## Routing

- `MainLayout` envuelve catálogo, detalle, mis-trámites y detalle de expediente.
- `firma/:token` vive fuera del layout (sin distracciones, por diseño).
- Rutas con parámetros se sirven en `RenderMode.Server` (no prerenderizadas) porque los datos son dinámicos por expediente/token.

## Datos

Todo el contenido (notarías, precios, expedientes) es mock explícito (`core/data/mock-data.ts`), comentado como tal — no hay pilotos reales documentados en `PRODUCT.md` todavía.

## Pendiente / siguiente iteración

- Reemplazar mock data por el servicio real cuando exista API.
- Diseñar el flujo de carga de documentos (drag & drop) referenciado en "Detalle del expediente" pero no detallado en el brief original.
- Evaluar si el panel de notaría (segunda audiencia de `PRODUCT.md`) necesita su propia superficie `/impeccable shape`.
