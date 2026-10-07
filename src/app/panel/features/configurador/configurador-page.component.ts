import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TramitesCatalogoService } from '../../../core/services/panel.service';
import { PanelHeaderComponent, Breadcrumb } from '../../shared/panel-header/panel-header.component';
import { ToastService } from '../../shared/toast/toast.service';
import { TramiteConfigurado } from '../../../core/models/tramite-catalogo.model';

type Tab = 'requisitos' | 'copias-partes' | 'precios-plazos' | 'plantilla';

const VACIO: TramiteConfigurado = {
  id: '',
  nombre: '',
  categoria: '',
  estado: 'borrador',
  requisitos: [],
  copias: 1,
  partes: [{ rol: '', obligatorio: true }],
  precio: 0,
  plazoHabiles: 1,
  plantilla: '',
  actualizado: '',
};

@Component({
  selector: 'app-configurador-page',
  standalone: true,
  imports: [RouterLink, PanelHeaderComponent],
  templateUrl: './configurador-page.component.html',
})
export class ConfiguradorPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly servicio = inject(TramitesCatalogoService);
  private readonly toast = inject(ToastService);

  readonly esNuevo = !this.route.snapshot.paramMap.get('id');
  readonly tramite = signal<TramiteConfigurado>(
    this.esNuevo ? { ...VACIO } : { ...(this.servicio.porId(this.route.snapshot.paramMap.get('id')!) ?? VACIO) }
  );

  readonly breadcrumbs = computed<Breadcrumb[]>(() => [
    { label: 'Trámites', ruta: '/panel/tramites' },
    { label: this.esNuevo ? 'Nuevo trámite' : this.tramite().nombre },
  ]);

  readonly tabActual = signal<Tab>('requisitos');
  readonly requisitoNuevo = signal('');

  irA(tab: Tab): void {
    this.tabActual.set(tab);
  }

  agregarRequisito(): void {
    const texto = this.requisitoNuevo().trim();
    if (!texto) return;
    this.tramite.update((t) => ({ ...t, requisitos: [...t.requisitos, texto] }));
    this.requisitoNuevo.set('');
  }

  quitarRequisito(index: number): void {
    this.tramite.update((t) => ({ ...t, requisitos: t.requisitos.filter((_, i) => i !== index) }));
  }

  agregarParte(): void {
    this.tramite.update((t) => ({ ...t, partes: [...t.partes, { rol: '', obligatorio: true }] }));
  }

  quitarParte(index: number): void {
    this.tramite.update((t) => ({ ...t, partes: t.partes.filter((_, i) => i !== index) }));
  }

  actualizarCampo<K extends keyof TramiteConfigurado>(campo: K, valor: TramiteConfigurado[K]): void {
    this.tramite.update((t) => ({ ...t, [campo]: valor }));
  }

  actualizarParteRol(index: number, rol: string): void {
    this.tramite.update((t) => ({ ...t, partes: t.partes.map((p, i) => (i === index ? { ...p, rol } : p)) }));
  }

  guardar(): void {
    this.toast.mostrar(this.esNuevo ? 'Trámite creado como borrador.' : 'Cambios guardados.', 'exito');
    this.router.navigate(['/panel/tramites']);
  }
}
