import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TramitesCatalogoService } from '../../../core/services/panel.service';
import { PanelHeaderComponent, Breadcrumb } from '../../shared/panel-header/panel-header.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { tramiteCatalogoEstadoInfo } from '../../../core/services/panel-estado.util';
import { TramiteConfigurado } from '../../../core/models/tramite-catalogo.model';

@Component({
  selector: 'app-catalogo-page',
  standalone: true,
  imports: [RouterLink, PanelHeaderComponent, ConfirmModalComponent],
  templateUrl: './catalogo-page.component.html',
})
export class CatalogoPageComponent {
  private readonly servicio = inject(TramitesCatalogoService);
  private readonly toast = inject(ToastService);

  readonly breadcrumbs: Breadcrumb[] = [{ label: 'Trámites' }];
  readonly estadoInfo = tramiteCatalogoEstadoInfo;
  readonly tramites = signal<TramiteConfigurado[]>(this.servicio.listar());
  readonly tramiteArchivar = signal<TramiteConfigurado | null>(null);

  publicar(t: TramiteConfigurado): void {
    this.actualizar(t.id, { estado: 'publicado' });
    this.toast.mostrar(`"${t.nombre}" fue publicado.`, 'exito');
  }

  pedirArchivar(t: TramiteConfigurado): void {
    this.tramiteArchivar.set(t);
  }

  confirmarArchivar(): void {
    const t = this.tramiteArchivar();
    if (!t) return;
    this.actualizar(t.id, { estado: 'archivado' });
    this.toast.mostrar(`"${t.nombre}" fue archivado.`, 'info');
    this.tramiteArchivar.set(null);
  }

  private actualizar(id: string, cambios: Partial<TramiteConfigurado>): void {
    this.tramites.update((lista) => lista.map((t) => (t.id === id ? { ...t, ...cambios } : t)));
  }
}
