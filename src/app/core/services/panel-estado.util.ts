import { EstadoDocumento } from '../models/expediente.model';
import { EstadoTramiteCatalogo } from '../models/tramite-catalogo.model';
import { EstadoUsuarioInterno } from '../models/usuario-interno.model';

export interface EstadoPanelInfo {
  label: string;
  colorVar: string;
  bgVar: string;
}

const DOCUMENTO: Record<EstadoDocumento, EstadoPanelInfo> = {
  pendiente: { label: 'Pendiente', colorVar: 'var(--color-ink-500)', bgVar: 'var(--color-sand-100)' },
  cargado: { label: 'Cargado', colorVar: 'var(--color-pending-600)', bgVar: 'var(--color-pending-100)' },
  observado: { label: 'Observado', colorVar: 'var(--color-pending-600)', bgVar: 'var(--color-pending-100)' },
  rechazado: { label: 'Rechazado', colorVar: 'var(--color-alert-600)', bgVar: 'var(--color-alert-100)' },
  validado: { label: 'Validado', colorVar: 'var(--color-success-600)', bgVar: 'var(--color-success-100)' },
};

const TRAMITE_CATALOGO: Record<EstadoTramiteCatalogo, EstadoPanelInfo> = {
  borrador: { label: 'Borrador', colorVar: 'var(--color-ink-500)', bgVar: 'var(--color-sand-100)' },
  publicado: { label: 'Publicado', colorVar: 'var(--color-success-600)', bgVar: 'var(--color-success-100)' },
  archivado: { label: 'Archivado', colorVar: 'var(--color-ink-500)', bgVar: 'var(--color-sand-100)' },
};

const USUARIO: Record<EstadoUsuarioInterno, EstadoPanelInfo> = {
  activo: { label: 'Activo', colorVar: 'var(--color-success-600)', bgVar: 'var(--color-success-100)' },
  invitado: { label: 'Invitado', colorVar: 'var(--color-pending-600)', bgVar: 'var(--color-pending-100)' },
  revocado: { label: 'Revocado', colorVar: 'var(--color-alert-600)', bgVar: 'var(--color-alert-100)' },
};

export function documentoEstadoInfo(estado: EstadoDocumento): EstadoPanelInfo {
  return DOCUMENTO[estado];
}

export function tramiteCatalogoEstadoInfo(estado: EstadoTramiteCatalogo): EstadoPanelInfo {
  return TRAMITE_CATALOGO[estado];
}

export function usuarioEstadoInfo(estado: EstadoUsuarioInterno): EstadoPanelInfo {
  return USUARIO[estado];
}
