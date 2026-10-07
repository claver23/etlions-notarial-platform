# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, both essential to the product:

1. **La notaría (usuario profesional).** Personal de una notaría — administradores, notarios, validadores y asistentes — que gestiona en un panel el catálogo de trámites que ofrece, los expedientes digitales de sus clientes, la validación de documentos y el proceso de firma y legalización.
   - Core job: configurar su oferta de trámites, recibir y gestionar expedientes digitales de clientes, validar documentos, y firmar/legalizar en un flujo trazable y auditable.
2. **El cliente (usuario final).** Persona natural que necesita realizar un trámite notarial sin acudir presencialmente a la notaría.
   - Core job: encontrar el trámite que necesita, elegir una notaría, cargar los documentos requeridos, hacer seguimiento del estado, y firmar digitalmente desde su teléfono móvil mediante un código QR.

Los flujos se cruzan: el cliente inicia el expediente, la notaría gestiona y valida, el cliente firma, el notario legaliza.

## Product Purpose

ETLIONS NOTARIAL es una plataforma peruana que digitaliza el ciclo completo de un trámite notarial — selección del trámite, carga de documentos, validación, firma digital del cliente, firma del notario, y legalización — para que un cliente pueda completar un trámite sin acudir presencialmente, y para que una notaría pueda operar su negocio desde un panel diseñado para su operación en lugar de hojas de cálculo, correo y WhatsApp. Éxito significa expedientes cerrados más rápido, con menor tasa de rechazo por documentación incompleta, y con trazabilidad legal completa.

## Positioning

Hoy cada notaría peruana opera con su propio sistema aislado (si tiene uno), y las soluciones existentes en el mercado cubren como mucho un paso del proceso (agendar cita, subir documentos, o firmar). Ningún competidor combina las tres características siguientes a la vez:

- **Cobertura multi-notaría en un solo lugar:** catálogo de trámites de múltiples notarías, con precios, requisitos y tiempos visibles, para que el cliente compare y elija.
- **Ciclo completo digital y auditable:** desde la selección del trámite hasta la descarga del documento legalizado, en un solo expediente trazable.
- **Firma móvil vía QR sin certificado previo obligatorio:** el cliente firma desde cualquier celular escaneando un QR, sin instalar apps ni requerir hardware especial, mientras el flujo se diseña para alinearse con DNIe/IOFE donde la ley lo exige.

Esto se complementa con validación de documentos asistida por IA (detección temprana de faltantes, ilegibilidad o inconsistencias), un panel específico para la operación notarial (no un CRM genérico), y un modelo multi-tenant jerarquizado por RUC con auditoría inmutable de cada acción del expediente.

## Operating Context

- El expediente digital es la unidad central de trabajo: agrupa documentos, estados, validaciones, firmas y legalización de un trámite para un cliente en una notaría específica.
- Cada notaría es un tenant independiente identificado por RUC; los admins de una notaría no ven ni gestionan datos de otra.
- Dentro de una notaría, los roles son jerárquicos: admin, notario, validador, asistente. Solo el admin principal puede invitar a otros admins; todo cambio queda auditado.
- El cliente interactúa principalmente desde el móvil, especialmente en el paso de firma vía QR.
- El sector notarial peruano opera bajo fe pública: cada acción (carga, validación, firma, IP, momento) debe quedar registrada de forma inmutable para respaldo legal.
- No hay notarías piloto ni clientes reales confirmados todavía; el proyecto está en fase inicial de diseño. La identificación de notarías piloto es parte de una fase posterior de validación legal y descubrimiento de producto, sin impacto directo en el diseño actual.

## Capabilities and Constraints

Marco legal peruano que condiciona el diseño y el flujo, no solo el texto legal:

- **Firma digital — Ley N° 27269:** la firma digital dentro de la Infraestructura Oficial de Firma Electrónica (IOFE, típicamente vía DNIe) tiene la misma validez que una firma manuscrita. Una firma de trazo en pantalla es firma electrónica simple, de validez discutible. El flujo de firma del cliente y del notario debe priorizar DNIe o certificados de entidades acreditadas, no solo captura de trazo.
- **SID-SUNARP — presentación electrónica obligatoria (desde nov. 2023; Resolución N° 0090-2025-SUNARP/SN):** los partes notariales con actos inscribibles en SUNARP deben expedirse con firma digital del notario y prepararse para presentación vía SID-SUNARP.
- **Protección de datos personales — Ley N° 29733:** consentimiento expreso al registro, política de privacidad visible, y medidas de seguridad para el tratamiento de documentos y datos notariales.
- **Colegio de Notarios — digitalización del archivo notarial:** el almacenamiento de expedientes digitales debe alinearse con los estándares técnicos que defina el Consejo del Notariado / Junta de Decanos de los Colegios de Notarios del Perú (aún no detallados; constraint a seguir de cerca).
- **Accesibilidad:** Resolución N.° 001-2025-PCM/SGTD recomienda WCAG 2.2 nivel AA para plataformas digitales en Perú; aunque dirigida principalmente a entidades públicas, es la referencia vigente a adoptar, en especial en el portal del cliente (contraste, navegación por teclado, textos alternativos, formularios accesibles).
- **Idioma:** MVP en español peruano, tono profesional y sobrio. Post-MVP: evaluar soporte de quechua y aimara en el portal del cliente (idiomas oficiales en zonas donde predominan, Art. 48 Constitución; SUNARP ya ofrece lectura multilingüe registral).
- Terminología de dominio a preservar: trámite, expediente, notaría, notario, validador, admin, RUC (identificador de tenant), legalización, parte notarial, SID-SUNARP, DNIe, IOFE.

## Brand Commitments

- Nombre definido: **ETLIONS NOTARIAL**.
- Logotipo definido por el equipo fundador, pendiente de formalización como marca registrada ante INDECOPI (archivo del logo aún no incorporado al repositorio).
- Colores de marca indicados por el cliente: azul corporativo profundo (`#0A2540` o similar), blanco, gris claro, acento dorado.

## Evidence on Hand

- No hay notarías piloto, clientes reales, testimonios, casos de estudio ni datos de uso confirmados todavía. No inventar evidencia de este tipo en trabajo futuro.
- El repositorio actual es un scaffold inicial de Angular CLI (commit único "initial commit") sin implementación de producto todavía; no hay DESIGN.md ni sistema visual incumbente más allá de la paleta de marca indicada arriba.

## Product Principles

1. **El ciclo completo o nada.** Cada decisión de producto debe sostener el flujo end-to-end (selección → carga → validación → firma cliente → firma notario → legalización) como una sola experiencia trazable, no como pasos desconectados.
2. **La ley define el diseño, no al revés.** El flujo de firma, el almacenamiento del expediente y el manejo de datos personales deben diseñarse para cumplir Ley 27269, SID-SUNARP, Ley 29733 y los estándares del Colegio de Notarios, incluso cuando eso añada fricción.
3. **Dos audiencias, una sola fuente de verdad.** El panel de notaría y el portal de cliente son superficies distintas sobre el mismo expediente; ninguna decisión de una debe romper la trazabilidad o los permisos de la otra.
4. **Aislamiento estricto por tenant.** El modelo multi-tenant por RUC y la jerarquía de roles dentro de cada notaría son innegociables: ninguna notaría debe poder ver o inferir datos de otra.
5. **Confianza por trazabilidad visible.** Dado que la fe pública es el centro del negocio, la auditoría (quién, qué, cuándo, desde dónde) debe ser visible y verificable para el usuario profesional, no solo registrada internamente.

## Accessibility & Inclusion

Adoptar WCAG 2.2 nivel AA como estándar de diseño (referencia: Resolución N.° 001-2025-PCM/SGTD), con énfasis en el portal del cliente: contraste suficiente, navegación por teclado, textos alternativos y formularios accesibles. Interfaz MVP solo en español peruano; soporte de quechua y aimara queda como evaluación post-MVP, no un requisito actual.
