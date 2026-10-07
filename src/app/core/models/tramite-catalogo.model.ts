export type EstadoTramiteCatalogo = 'borrador' | 'publicado' | 'archivado';

export interface ParteRequerida {
  rol: string;
  obligatorio: boolean;
}

export interface TramiteConfigurado {
  id: string;
  nombre: string;
  categoria: string;
  estado: EstadoTramiteCatalogo;
  requisitos: string[];
  copias: number;
  partes: ParteRequerida[];
  precio: number;
  plazoHabiles: number;
  plantilla: string;
  actualizado: string;
}
