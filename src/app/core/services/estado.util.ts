import { EstadoExpediente } from '../models/expediente.model';

export interface EstadoInfo {
  label: string;
  colorVar: string;
  bgVar: string;
}

const ESTADOS: Record<EstadoExpediente, EstadoInfo> = {
  borrador: { label: 'Borrador', colorVar: 'var(--color-status-draft)', bgVar: '#f3f4f6' },
  en_revision: { label: 'En revisión', colorVar: 'var(--color-status-review)', bgVar: '#eef1f4' },
  observado: { label: 'Observado', colorVar: 'var(--color-status-observed)', bgVar: '#fdf0dd' },
  aprobado: { label: 'Aprobado', colorVar: 'var(--color-status-approved)', bgVar: '#e7ecf1' },
  firmado: { label: 'Firmado', colorVar: 'var(--color-status-signed)', bgVar: 'var(--color-coral-50)' },
  legalizado: { label: 'Legalizado', colorVar: 'var(--color-status-legalized)', bgVar: '#e3f6ef' },
};

export const ESTADO_SECUENCIA: EstadoExpediente[] = [
  'en_revision',
  'observado',
  'aprobado',
  'firmado',
  'legalizado',
];

export function estadoInfo(estado: EstadoExpediente): EstadoInfo {
  return ESTADOS[estado];
}
