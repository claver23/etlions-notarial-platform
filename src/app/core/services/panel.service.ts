import { Injectable } from '@angular/core';
import { TRAMITES_CATALOGO_MOCK, USUARIOS_MOCK, AUDITORIA_MOCK } from '../data/panel-mock-data';
import { TramiteConfigurado } from '../models/tramite-catalogo.model';
import { UsuarioInterno } from '../models/usuario-interno.model';
import { EventoAuditoria } from '../models/auditoria.model';

@Injectable({ providedIn: 'root' })
export class TramitesCatalogoService {
  private readonly tramites = TRAMITES_CATALOGO_MOCK;

  listar(): TramiteConfigurado[] {
    return this.tramites;
  }

  porId(id: string): TramiteConfigurado | undefined {
    return this.tramites.find((t) => t.id === id);
  }
}

@Injectable({ providedIn: 'root' })
export class UsuariosInternosService {
  private readonly usuarios = USUARIOS_MOCK;

  listar(): UsuarioInterno[] {
    return this.usuarios;
  }
}

@Injectable({ providedIn: 'root' })
export class AuditoriaService {
  private readonly eventos = AUDITORIA_MOCK;

  listar(): EventoAuditoria[] {
    return this.eventos;
  }
}
