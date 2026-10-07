import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpedientesService } from '../../../core/services/expedientes.service';
import { PanelHeaderComponent, Breadcrumb } from '../../shared/panel-header/panel-header.component';
import { estadoInfo } from '../../../core/services/estado.util';
import { EstadoExpediente } from '../../../core/models/expediente.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, PanelHeaderComponent],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {
  private readonly expedientesService = inject(ExpedientesService);
  readonly breadcrumbs: Breadcrumb[] = [{ label: 'Dashboard' }];

  private readonly expedientes = signal(this.expedientesService.listar());

  readonly pendientesHoy = computed(() =>
    this.expedientes().filter((e) => e.estado === 'observado' || e.estado === 'en_revision' || e.estado === 'borrador')
  );

  readonly porEstado = computed(() => {
    const conteo = new Map<EstadoExpediente, number>();
    for (const e of this.expedientes()) {
      conteo.set(e.estado, (conteo.get(e.estado) ?? 0) + 1);
    }
    return Array.from(conteo.entries()).map(([estado, total]) => ({ estado, total, info: estadoInfo(estado) }));
  });

  readonly tramitesActivos = computed(
    () => this.expedientes().filter((e) => !['legalizado'].includes(e.estado)).length
  );

  readonly tasaObservacion = computed(() => {
    const total = this.expedientes().length;
    const observados = this.expedientes().filter((e) => e.historial.some((h) => h.estado === 'observado')).length;
    return total ? Math.round((observados / total) * 100) : 0;
  });

  readonly tiempoPromedioDias = computed(() => {
    const cerrados = this.expedientes().filter((e) => e.estado === 'legalizado');
    if (!cerrados.length) return 0;
    const dias = cerrados.map((e) => diasEntre(e.creado, e.actualizado));
    return Math.round(dias.reduce((a, b) => a + b, 0) / dias.length);
  });

  estadoInfo = estadoInfo;
}

function diasEntre(desde: string, hasta: string): number {
  const ms = new Date(hasta).getTime() - new Date(desde).getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}
