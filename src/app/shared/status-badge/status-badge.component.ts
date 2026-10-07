import { Component, Input } from '@angular/core';
import { EstadoExpediente } from '../../core/models/expediente.model';
import { estadoInfo } from '../../core/services/estado.util';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-tight"
      [style.background]="info.bgVar"
      [style.color]="info.colorVar"
    >
      <span class="h-1.5 w-1.5 rounded-full" [style.background]="info.colorVar"></span>
      {{ info.label }}
    </span>
  `,
})
export class StatusBadgeComponent {
  @Input({ required: true }) estado!: EstadoExpediente;

  get info() {
    return estadoInfo(this.estado);
  }
}
