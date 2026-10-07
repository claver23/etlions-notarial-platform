import { Injectable } from '@angular/core';
import { TRAMITES_MOCK } from '../data/mock-data';
import { Tramite } from '../models/tramite.model';

@Injectable({ providedIn: 'root' })
export class TramitesService {
  private readonly tramites = TRAMITES_MOCK;

  listar(): Tramite[] {
    return this.tramites;
  }

  buscar(query: string): Tramite[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.tramites;
    return this.tramites.filter(
      (t) => t.nombre.toLowerCase().includes(q) || t.categoria.toLowerCase().includes(q),
    );
  }

  porId(id: string): Tramite | undefined {
    return this.tramites.find((t) => t.id === id);
  }

  categorias(): string[] {
    return Array.from(new Set(this.tramites.map((t) => t.categoria)));
  }
}
