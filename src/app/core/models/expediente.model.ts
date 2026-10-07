export type EstadoExpediente =
  | 'borrador'
  | 'en_revision'
  | 'observado'
  | 'aprobado'
  | 'firmado'
  | 'legalizado';

export interface EstadoHistorial {
  estado: EstadoExpediente;
  fecha: string;
  nota?: string;
}

export type EstadoDocumento = 'pendiente' | 'cargado' | 'observado' | 'validado';

export interface DocumentoExpediente {
  id: string;
  nombre: string;
  obligatorio: boolean;
  estado: EstadoDocumento;
  observacion?: string;
}

export interface Expediente {
  id: string;
  codigo: string;
  tramiteNombre: string;
  notariaNombre: string;
  estado: EstadoExpediente;
  actualizado: string;
  creado: string;
  documentos: DocumentoExpediente[];
  historial: EstadoHistorial[];
  accionPendiente?: string;
}
