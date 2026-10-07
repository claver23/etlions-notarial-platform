import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type FirmaEstado = 'cargando' | 'lista' | 'firmando' | 'firmada' | 'expirada';

@Component({
  selector: 'app-firma-page',
  standalone: true,
  templateUrl: './firma-page.component.html',
})
export class FirmaPageComponent {
  readonly estado = signal<FirmaEstado>('lista');
  readonly aceptaTerminos = signal(false);
  readonly token: string;

  // Datos de ejemplo del documento a firmar — en producción vienen del expediente real.
  readonly documento = {
    codigo: 'EXP-2026-0142',
    nombre: 'Minuta de compraventa vehicular',
    notaria: 'Notaría Ejemplo Miraflores',
    paginas: 4,
  };

  constructor(route: ActivatedRoute) {
    this.token = route.snapshot.paramMap.get('token') ?? '';
    // Token de ejemplo que simula un enlace QR vencido, solo para mostrar el estado.
    if (this.token === 'expirado') {
      this.estado.set('expirada');
    }
  }

  confirmarFirma() {
    if (!this.aceptaTerminos()) return;
    this.estado.set('firmando');
    setTimeout(() => this.estado.set('firmada'), 1400);
  }
}
