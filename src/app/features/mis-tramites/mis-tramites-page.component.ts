import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpedientesService } from '../../core/services/expedientes.service';
import { Expediente } from '../../core/models/expediente.model';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-mis-tramites-page',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './mis-tramites-page.component.html',
})
export class MisTramitesPageComponent {
  readonly expedientes: Expediente[];

  constructor(private readonly expedientesService: ExpedientesService) {
    this.expedientes = this.expedientesService.listar();
  }
}
