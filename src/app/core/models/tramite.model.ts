export type TramiteCategoria =
  | 'Compraventa'
  | 'Poderes'
  | 'Testamentos'
  | 'Constitución de empresa'
  | 'Declaraciones juradas';

export interface NotariaOferta {
  notariaId: string;
  notariaNombre: string;
  distrito: string;
  precio: number;
  demoraHabiles: number;
  calificacion: number;
}

export interface Tramite {
  id: string;
  nombre: string;
  categoria: TramiteCategoria;
  resumen: string;
  descripcion: string;
  requisitos: string[];
  precioDesde: number;
  demoraDesde: number;
  notarias: NotariaOferta[];
}
