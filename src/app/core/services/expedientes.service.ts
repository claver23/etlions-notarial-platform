import { Injectable } from '@angular/core';
import { EXPEDIENTES_MOCK } from '../data/mock-data';
import { Expediente } from '../models/expediente.model';

@Injectable({ providedIn: 'root' })
export class ExpedientesService {
  private readonly expedientes = EXPEDIENTES_MOCK;

  listar(): Expediente[] {
    return this.expedientes;
  }

  porId(id: string): Expediente | undefined {
    return this.expedientes.find((e) => e.id === id);
  }
}
