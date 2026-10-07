---
version: 1
slug: "route-panel"
primary_target: "route:/panel"
related_targets: []
---

# Surface brief — Panel de notaría

## Job y audiencia
Personal profesional de una notaría (admin, notario, validador, asistente) operando su jornada completa desde desktop (1440px base). Modo **Operate**: prioridad absoluta a productividad y escaneabilidad sobre deleite visual.

## Resultado y evidencia
- Tarea primaria: gestionar expedientes entrantes (ver, asignar, observar, aprobar, rechazar documentos), configurar el catálogo de trámites propio, administrar usuarios internos con roles, y auditar toda acción.
- Éxito = "¿qué necesita mi atención hoy?" respondido en 5 segundos desde el dashboard.
- Evidencia real: ninguna (sin notarías piloto todavía); todo dato es mock explícito, igual que el portal del cliente.

## Dirección seleccionada
- **Autoridad visual:** extiende DESIGN.md del portal del cliente (navy #0A2540, coral #E67E50, sand, ink) — no lo reemplaza. Añade semántica nueva de verde (#16A34A éxito), rojo (#DC2626 alerta/rechazo) y ámbar (#F59E0B pendiente) para acciones de validación y métricas del panel, separada del badge de 6 estados del expediente que ya existe.
- **Tesis estructural:** sidebar navy fijo + contenido denso en blanco; la tabla de expedientes es el centro de gravedad, no el dashboard.
- **Sin workshop de concepto:** composición ya totalmente especificada por el cliente (sidebar, tablas densas, drawer derecho, modales, chips de filtro, bulk actions bar, breadcrumbs, tooltips) — brief-pinned gana sobre exploración.

## Alcance y límites
- 7 pantallas: dashboard, bandeja de expedientes, detalle del expediente (panel), catálogo de trámites, configurador de trámite, gestión de usuarios, reportes/auditoría.
- Orden de construcción: dashboard y bandeja de expedientes primero (explícito en el brief), luego el resto.
- Un solo tenant/notaría en sesión simulada — sin selector multi-notaría (no hay piloto real).
- No tocar el portal del cliente ni su DESIGN.md existente; este es un mundo adicional (segunda superficie), no un reemplazo.
- Anti-goals explícitos: sin emojis, sin lenguaje informal, sin tablas espaciosas tipo portal del cliente, sin esconder acciones frecuentes en menús contextuales, máx. 3 niveles de navegación, solo íconos outline.

## Estados y rangos
- Documento: pendiente, cargado, rechazado (nuevo, rojo), observado (ámbar), validado (verde) — se añade "rechazado" al modelo EstadoDocumento, ausente hasta ahora, porque el brief pide explícitamente que el validador pueda rechazar.
- Expediente: reutiliza los 6 estados ya definidos (borrador/en_revisión/observado/aprobado/firmado/legalizado) sin cambios.
- Trámite (catálogo notaría): borrador, publicado, archivado.
- Usuario interno: activo, invitado (pendiente de aceptar), revocado.
- Estados vacíos informativos en cada bandeja/tabla (no decorativos).

## Interacción y layout
- Sidebar navy con íconos outline + labels, logo compacto (ícono solo) arriba.
- Tablas densas (filas 48px), sort, filtros chip inline, selección múltiple + barra de acciones bulk, paginación.
- Drawer lateral derecho para detalle sin perder contexto de tabla (usado en bandeja de expedientes).
- Modales para acciones destructivas (rechazar, revocar acceso) y formularios complejos.
- Búsqueda global en header con atajo "/"; breadcrumbs en vistas jerárquicas (notaría → trámite → expediente).
- Feedback inmediato: toasts, confirmación obligatoria en acciones destructivas.
- Responsive: base 1440px, soporta 1280px y 1920px; no se diseña para móvil (desktop-first real, a diferencia del portal del cliente).

## Restricciones y decisiones abiertas para el builder
- Tipografía Inter heredada, tamaños compactos (H1 24/H2 20/H3 16/body 14/caption 12).
- WCAG 2.2 AA igual que el portal.
- No inventar notarías, expedientes, clientes ni cifras reales — mock data explícitamente comentado.
- Reutilizar EstadoExpediente/estado.util.ts para el badge de expediente; crear utilidades nuevas para estado de documento (con rechazado) y estado de trámite/usuario sin tocar las existentes.
- Rutas nuevas bajo un layout de panel propio (sidebar + header), independiente del MainLayout del portal del cliente.
