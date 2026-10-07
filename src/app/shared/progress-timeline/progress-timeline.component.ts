import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoExpediente, EstadoHistorial } from '../../core/models/expediente.model';
import { ESTADO_SECUENCIA, estadoInfo } from '../../core/services/estado.util';

@Component({
  selector: 'app-progress-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-timeline.component.html',
})
export class ProgressTimelineComponent {
  @Input({ required: true }) estadoActual!: EstadoExpediente;
  @Input() historial: EstadoHistorial[] = [];

  readonly secuencia = ESTADO_SECUENCIA;

  info = estadoInfo;

  fechaDe(estado: EstadoExpediente): string | undefined {
    return this.historial.find((h) => h.estado === estado)?.fecha;
  }

  estaAlcanzado(estado: EstadoExpediente): boolean {
    if (this.estadoActual === 'borrador') return false;
    const idxActual = this.secuencia.indexOf(this.estadoActual === 'observado' ? 'en_revision' : this.estadoActual);
    const idx = this.secuencia.indexOf(estado);
    return idx <= idxActual;
  }

  esActual(estado: EstadoExpediente): boolean {
    return estado === this.estadoActual;
  }
}
