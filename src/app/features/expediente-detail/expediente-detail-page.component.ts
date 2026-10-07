import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpedientesService } from '../../core/services/expedientes.service';
import { Expediente } from '../../core/models/expediente.model';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';
import { ProgressTimelineComponent } from '../../shared/progress-timeline/progress-timeline.component';

@Component({
  selector: 'app-expediente-detail-page',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent, ProgressTimelineComponent],
  templateUrl: './expediente-detail-page.component.html',
})
export class ExpedienteDetailPageComponent {
  readonly expediente: Expediente | undefined;

  constructor(route: ActivatedRoute, private readonly expedientes: ExpedientesService) {
    const id = route.snapshot.paramMap.get('id') ?? '';
    this.expediente = this.expedientes.porId(id);
  }

  readonly etiquetaDocumento: Record<string, string> = {
    pendiente: 'Pendiente de carga',
    cargado: 'En revisión',
    observado: 'Observado',
    validado: 'Validado',
  };
}
