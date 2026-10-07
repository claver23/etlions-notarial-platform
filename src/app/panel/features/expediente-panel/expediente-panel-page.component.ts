import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpedientesService } from '../../../core/services/expedientes.service';
import { PanelHeaderComponent, Breadcrumb } from '../../shared/panel-header/panel-header.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { ProgressTimelineComponent } from '../../../shared/progress-timeline/progress-timeline.component';
import { estadoInfo } from '../../../core/services/estado.util';
import { documentoEstadoInfo } from '../../../core/services/panel-estado.util';
import { DocumentoExpediente, Expediente } from '../../../core/models/expediente.model';

@Component({
  selector: 'app-expediente-panel-page',
  standalone: true,
  imports: [RouterLink, PanelHeaderComponent, ProgressTimelineComponent, ConfirmModalComponent],
  templateUrl: './expediente-panel-page.component.html',
})
export class ExpedientePanelPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly expedientesService = inject(ExpedientesService);
  private readonly toast = inject(ToastService);

  readonly estadoInfo = estadoInfo;
  readonly documentoEstadoInfo = documentoEstadoInfo;

  readonly expediente = signal<Expediente | undefined>(
    this.expedientesService.porId(this.route.snapshot.paramMap.get('id') ?? '')
  );

  readonly breadcrumbs = computed<Breadcrumb[]>(() => [
    { label: 'Expedientes', ruta: '/panel/expedientes' },
    { label: this.expediente()?.codigo ?? 'Expediente' },
  ]);

  readonly documentoRechazo = signal<DocumentoExpediente | null>(null);

  validarDocumento(doc: DocumentoExpediente): void {
    this.actualizarDocumento(doc.id, { estado: 'validado', observacion: undefined });
    this.toast.mostrar(`"${doc.nombre}" fue validado.`, 'exito');
  }

  pedirRechazo(doc: DocumentoExpediente): void {
    this.documentoRechazo.set(doc);
  }

  confirmarRechazo(): void {
    const doc = this.documentoRechazo();
    if (!doc) return;
    this.actualizarDocumento(doc.id, { estado: 'rechazado', observacion: 'Rechazado por el validador desde el panel.' });
    this.toast.mostrar(`"${doc.nombre}" fue rechazado.`, 'error');
    this.documentoRechazo.set(null);
  }

  private actualizarDocumento(id: string, cambios: Partial<DocumentoExpediente>): void {
    this.expediente.update((exp) => {
      if (!exp) return exp;
      return { ...exp, documentos: exp.documentos.map((d) => (d.id === id ? { ...d, ...cambios } : d)) };
    });
  }
}
