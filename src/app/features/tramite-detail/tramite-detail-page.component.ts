import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TramitesService } from '../../core/services/tramites.service';
import { Tramite } from '../../core/models/tramite.model';

@Component({
  selector: 'app-tramite-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tramite-detail-page.component.html',
})
export class TramiteDetailPageComponent {
  readonly tramite: Tramite | undefined;

  constructor(route: ActivatedRoute, private readonly router: Router, private readonly tramites: TramitesService) {
    const id = route.snapshot.paramMap.get('id') ?? '';
    this.tramite = this.tramites.porId(id);
  }

  iniciarTramite() {
    this.router.navigate(['/mis-tramites']);
  }
}
