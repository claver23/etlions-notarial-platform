import { Component, computed, inject, signal } from '@angular/core';
import { AuditoriaService } from '../../../core/services/panel.service';
import { PanelHeaderComponent, Breadcrumb } from '../../shared/panel-header/panel-header.component';
import { ToastService } from '../../shared/toast/toast.service';
import { EventoAuditoria } from '../../../core/models/auditoria.model';

@Component({
  selector: 'app-auditoria-page',
  standalone: true,
  imports: [PanelHeaderComponent],
  templateUrl: './auditoria-page.component.html',
})
export class AuditoriaPageComponent {
  private readonly servicio = inject(AuditoriaService);
  private readonly toast = inject(ToastService);

  readonly breadcrumbs: Breadcrumb[] = [{ label: 'Auditoría' }];
  readonly eventos = signal<EventoAuditoria[]>(this.servicio.listar());

  readonly usuarios = computed(() => Array.from(new Set(this.eventos().map((e) => e.usuario))));
  readonly acciones = computed(() => Array.from(new Set(this.eventos().map((e) => e.accion))));

  readonly filtroUsuario = signal('todos');
  readonly filtroAccion = signal('todas');

  readonly filtrados = computed(() =>
    this.eventos().filter((e) => {
      const coincideUsuario = this.filtroUsuario() === 'todos' || e.usuario === this.filtroUsuario();
      const coincideAccion = this.filtroAccion() === 'todas' || e.accion === this.filtroAccion();
      return coincideUsuario && coincideAccion;
    })
  );

  exportar(): void {
    this.toast.mostrar(`Exportando ${this.filtrados().length} evento(s) a CSV…`, 'info');
  }
}
