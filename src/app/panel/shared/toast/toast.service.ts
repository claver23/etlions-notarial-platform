import { Injectable, signal } from '@angular/core';

export type ToastTipo = 'exito' | 'error' | 'info';

export interface ToastMensaje {
  id: number;
  texto: string;
  tipo: ToastTipo;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private contador = 0;
  readonly mensajes = signal<ToastMensaje[]>([]);

  mostrar(texto: string, tipo: ToastTipo = 'info'): void {
    const id = ++this.contador;
    this.mensajes.update((lista) => [...lista, { id, texto, tipo }]);
    setTimeout(() => this.descartar(id), 4000);
  }

  descartar(id: number): void {
    this.mensajes.update((lista) => lista.filter((m) => m.id !== id));
  }
}
