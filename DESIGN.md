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

## Panel de notaría (segunda superficie, Operate)

> Superficie aditiva: extiende el sistema de tokens de arriba, no lo reemplaza. Brief fijado en `.impeccable/surfaces/route-panel.md`; revisión de cierre con tres ajustes de accesibilidad/contraste aplicados y verificados en una segunda ronda.

### Dirección

- **THESIS**: la bandeja de expedientes es el centro de gravedad, no el dashboard; se rechaza la plantilla de "tablero con tarjetas de métricas" como pantalla principal.
- **STORY**: el personal de notaría ve en segundos qué expediente necesita su atención hoy, valida o rechaza documentos con trazabilidad, y configura su catálogo sin fricción.
- **FORM**: sidebar navy fijo + contenido denso en blanco, tablas de fila 48px, drawer derecho, modales de confirmación, Inter en escala compacta (H1 24/H2 20/H3 16/body 14/caption 12), íconos solo outline — aplicado con disciplina en las 7 pantallas.

### Tokens

Hereda `navy`/`coral`/`sand`/`ink` y el badge de 6 estados del expediente (`--color-status-*`) sin tocarlos. Añade semántica operativa nueva para documentos, trámites del catálogo propio y usuarios internos (`src/styles.css`, bloque "Panel de notaría — semántica operativa adicional"):

| Token | Valor | Uso |
|---|---|---|
| `--color-success-600` / `--color-success-500` / `--color-success-100` | `#15803d` / `#16a34a` / `#dcfce7` | documento validado, trámite publicado, usuario activo (texto/acento, texto fuerte, fondo de badge) |
| `--color-alert-600` / `--color-alert-500` / `--color-alert-100` | `#b91c1c` / `#dc2626` / `#fee2e2` | documento rechazado, usuario revocado, botón destructivo del modal de confirmación |
| `--color-pending-600` / `--color-pending-500` / `--color-pending-100` | `#b45309` / `#f59e0b` / `#fef3c7` | documento cargado/observado, usuario invitado |

### Estados de documento (`EstadoDocumento`, `expediente.model.ts`)

`pendiente` (gris ink) · `cargado` (ámbar pending) · `observado` (ámbar pending) · **`rechazado`** (rojo alert, nuevo) · `validado` (verde success). `rechazado` se añadió explícitamente al modelo para que el validador del panel pueda rechazar un documento, algo que el portal del cliente no necesitaba. Visualmente y de significado difiere de `observado`: `observado` comparte el tono ámbar de "requiere una corrección del cliente, el flujo puede continuar"; `rechazado` usa el rojo de alerta porque es una decisión terminal del validador sobre ese documento, con observación obligatoria registrada (`confirmarRechazo()` en `expediente-panel-page.component.ts`), no una desviación recuperable sin intervención.

### Componentes compartidos (`panel/shared/`)

- **`panel-sidebar`** — navegación fija navy con 5 ítems (Dashboard, Expedientes, Trámites, Usuarios, Auditoría), íconos outline + label.
- **`panel-header`** — breadcrumbs jerárquicos + buscador global con atajo de teclado `/` que enfoca el input (ignorado si el foco ya está en un campo), vía `@HostListener('document:keydown')`.
- **`panel-badge`** — píldora de color genérica (label + color + bg inyectados), reutilizada por los tres `*-estado.util.ts` de documento/trámite/usuario.
- **`drawer`** — panel lateral derecho modal (`role="dialog"`, overlay navy 30%), usado para ver detalle de expediente sin perder la fila de contexto en la tabla.
- **`confirm-modal`** — modal de confirmación centrado (`role="alertdialog"`) con variante `destructivo` (rojo alert) para acciones irreversibles: rechazar documento, revocar usuario, archivar trámite.
- **`toast`** (`toast.service` + `toast-host`) — notificaciones efímeras de 4s con tipo `exito`/`error`/`info`, servicio con signal de cola.

### Pantallas construidas (`panel/features/`)

1. **Dashboard** (`dashboard/dashboard-page.component.ts`) — rechaza el dashboard de tarjetas de métricas: la tabla de "pendientes hoy" (observado/en_revisión/borrador) es la pieza principal, con métricas (activos, tasa de observación, tiempo promedio) en segundo plano.
2. **Bandeja de expedientes** (`bandeja/bandeja-page.component.ts`) — tabla densa con filtro por estado + búsqueda, selección múltiple con barra de acciones bulk (aprobar/observar con confirmación), y drawer de detalle sin navegar fuera de la tabla.
3. **Detalle del expediente** (`expediente-panel/expediente-panel-page.component.ts`) — reutiliza pragmáticamente `ProgressTimelineComponent` del portal del cliente en vez de construir una nueva timeline; añade validación/rechazo de documentos con modal de confirmación obligatorio para rechazar.
4. **Catálogo de trámites** (`catalogo/catalogo-page.component.ts`) — gestiona el ciclo `borrador → publicado → archivado` propio de la notaría, independiente del catálogo público del portal del cliente.
5. **Configurador de trámite** (`configurador/configurador-page.component.ts`) — formulario por pestañas (requisitos, copias/partes, precios/plazos, plantilla) para crear o editar un trámite, en vez de un formulario largo de scroll único.
6. **Gestión de usuarios** (`usuarios/usuarios-page.component.ts`) — invitación por correo con rol (`admin`/`notario`/`validador`/`asistente`), cambio de rol inline, y revocación con confirmación destructiva.
7. **Auditoría** (`auditoria/auditoria-page.component.ts`) — tabla de eventos filtrable por usuario/acción con acción de exportar a CSV (solo toast, sin generación real de archivo todavía).

### Routing

- `PanelLayoutComponent` (`panel/layout/panel-layout/panel-layout.component.ts`) es un layout separado de `MainLayoutComponent`: sidebar + `router-outlet` + `toast-host`, sin el header/footer del portal del cliente.
- Árbol `/panel/*` en `app.routes.ts`: `dashboard`, `expedientes`, `expedientes/:id`, `tramites`, `tramites/nuevo`, `tramites/:id/editar`, `usuarios`, `auditoria`.
- `app.routes.server.ts` fuerza `RenderMode.Server` en `panel/expedientes/:id` y `panel/tramites/:id/editar` — las dos rutas parametrizadas del panel — por la misma razón que las del portal: datos dinámicos por ID que no pueden prerenderizarse.

### Datos

Todo mock explícito: `core/data/panel-mock-data.ts` (trámites del catálogo, usuarios internos, eventos de auditoría, consumidos por `panel.service.ts`) y una extensión de `core/data/mock-data.ts` para los campos nuevos de `Expediente` (`clienteNombre`, `asignadoA`). Sesión de un solo tenant/notaría simulada: no hay selector multi-notaría — decisión de alcance abierta (no hay piloto real todavía), no un defecto a corregir.

### Pendiente / siguiente iteración

- Reemplazar `panel-mock-data.ts` y la extensión de `mock-data.ts` por API real.
- Selector multi-notaría si se incorpora una segunda notaría piloto (fuera de alcance explícito hasta entonces).
- Persistencia real del log de auditoría (hoy es lista mock sin backend) y exportación a CSV funcional (hoy solo dispara un toast).
- Especificar el flujo de carga/reemplazo de documentos en el detalle de expediente del panel, igual que la misma brecha anotada para el portal del cliente.
