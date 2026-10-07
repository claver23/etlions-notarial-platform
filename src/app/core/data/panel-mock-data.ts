import { TramiteConfigurado } from '../models/tramite-catalogo.model';
import { UsuarioInterno } from '../models/usuario-interno.model';
import { EventoAuditoria } from '../models/auditoria.model';

// Datos de ejemplo para el panel de notaría — ninguna cifra, usuario o
// evento es real. Reemplazar antes de producción.

export const TRAMITES_CATALOGO_MOCK: TramiteConfigurado[] = [
  {
    id: 'compraventa-vehicular',
    nombre: 'Compraventa de vehículo',
    categoria: 'Compraventa',
    estado: 'publicado',
    requisitos: ['DNI vigente de comprador y vendedor', 'Tarjeta de propiedad del vehículo', 'Certificado de gravamen (no mayor a 30 días)'],
    copias: 2,
    partes: [
      { rol: 'Comprador', obligatorio: true },
      { rol: 'Vendedor', obligatorio: true },
    ],
    precio: 180,
    plazoHabiles: 2,
    plantilla: 'minuta-compraventa-v2.docx',
    actualizado: '2026-09-12',
  },
  {
    id: 'poder-fuera-registro',
    nombre: 'Poder fuera de registro',
    categoria: 'Poderes',
    estado: 'publicado',
    requisitos: ['DNI vigente del poderdante', 'Datos completos del apoderado'],
    copias: 1,
    partes: [{ rol: 'Poderdante', obligatorio: true }],
    precio: 90,
    plazoHabiles: 1,
    plantilla: 'poder-fuera-registro-v1.docx',
    actualizado: '2026-07-30',
  },
  {
    id: 'testamento-cerrado',
    nombre: 'Testamento cerrado',
    categoria: 'Testamentos',
    estado: 'publicado',
    requisitos: ['DNI vigente', 'Documento testamentario en sobre cerrado', 'Dos testigos hábiles'],
    copias: 1,
    partes: [
      { rol: 'Testador', obligatorio: true },
      { rol: 'Testigo', obligatorio: true },
    ],
    precio: 320,
    plazoHabiles: 3,
    plantilla: 'testamento-cerrado-v1.docx',
    actualizado: '2026-06-18',
  },
  {
    id: 'constitucion-empresa',
    nombre: 'Constitución de empresa (S.A.C.)',
    categoria: 'Constitución de empresa',
    estado: 'archivado',
    requisitos: ['DNI vigente de todos los socios', 'Reserva de nombre en SUNARP'],
    copias: 3,
    partes: [{ rol: 'Socio', obligatorio: true }],
    precio: 480,
    plazoHabiles: 5,
    plantilla: 'constitucion-sac-v3.docx',
    actualizado: '2026-03-02',
  },
  {
    id: 'declaracion-jurada-domicilio',
    nombre: 'Declaración jurada de domicilio',
    categoria: 'Declaraciones juradas',
    estado: 'borrador',
    requisitos: ['DNI vigente', 'Recibo de servicio con la dirección a declarar'],
    copias: 1,
    partes: [{ rol: 'Declarante', obligatorio: true }],
    precio: 45,
    plazoHabiles: 1,
    plantilla: 'declaracion-domicilio-v1.docx',
    actualizado: '2026-10-03',
  },
];

export const USUARIOS_MOCK: UsuarioInterno[] = [
  { id: 'u-1', nombre: 'Rocío Valdivia', correo: 'rocio.valdivia@notariaejemplo.pe', rol: 'admin', estado: 'activo', ultimoAcceso: '2026-10-07' },
  { id: 'u-2', nombre: 'Carla Ríos', correo: 'carla.rios@notariaejemplo.pe', rol: 'validador', estado: 'activo', ultimoAcceso: '2026-10-07' },
  { id: 'u-3', nombre: 'Luis Prado', correo: 'luis.prado@notariaejemplo.pe', rol: 'validador', estado: 'activo', ultimoAcceso: '2026-10-06' },
  { id: 'u-4', nombre: 'Mariana Osorio', correo: 'mariana.osorio@notariaejemplo.pe', rol: 'notario', estado: 'activo', ultimoAcceso: '2026-10-05' },
  { id: 'u-5', nombre: 'Jorge Nieto', correo: 'jorge.nieto@notariaejemplo.pe', rol: 'asistente', estado: 'invitado', invitadoEl: '2026-10-05' },
  { id: 'u-6', nombre: 'Elena Campos', correo: 'elena.campos@notariaejemplo.pe', rol: 'asistente', estado: 'revocado', ultimoAcceso: '2026-08-14' },
];

export const AUDITORIA_MOCK: EventoAuditoria[] = [
  { id: 'a-1', fecha: '2026-10-07 09:14', usuario: 'Carla Ríos', accion: 'Aprobó documento', entidad: 'EXP-2026-0171 · Tarjeta de propiedad', detalle: 'Documento validado sin observaciones.' },
  { id: 'a-2', fecha: '2026-10-06 17:02', usuario: 'Luis Prado', accion: 'Rechazó documento', entidad: 'EXP-2026-0163 · Documento testamentario', detalle: 'El sobre llegó abierto, no cumple el requisito de custodia.' },
  { id: 'a-3', fecha: '2026-10-06 11:40', usuario: 'Rocío Valdivia', accion: 'Publicó trámite', entidad: 'Declaración jurada de domicilio', detalle: 'Cambio de estado: borrador → publicado.' },
  { id: 'a-4', fecha: '2026-10-05 16:20', usuario: 'Rocío Valdivia', accion: 'Invitó usuario', entidad: 'Jorge Nieto (asistente)', detalle: 'Invitación enviada a jorge.nieto@notariaejemplo.pe.' },
  { id: 'a-5', fecha: '2026-10-02 10:05', usuario: 'Carla Ríos', accion: 'Observó expediente', entidad: 'EXP-2026-0098', detalle: 'DNI del poderdante ilegible, se solicitó reenvío.' },
  { id: 'a-6', fecha: '2026-08-14 08:30', usuario: 'Rocío Valdivia', accion: 'Revocó acceso', entidad: 'Elena Campos (asistente)', detalle: 'Acceso revocado por fin de contrato.' },
];
