import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpedientesService } from '../../../core/services/expedientes.service';
import { PanelHeaderComponent, Breadcrumb } from '../../shared/panel-header/panel-header.component';
import { DrawerComponent } from '../../shared/drawer/drawer.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { estadoInfo } from '../../../core/services/estado.util';
import { Expediente, EstadoExpediente } from '../../../core/models/expediente.model';

type FiltroEstado = EstadoExpediente | 'todos';

const ORDEN_ESTADOS: EstadoExpediente[] = ['borrador', 'en_revision', 'observado', 'aprobado', 'firmado', 'legalizado'];

@Component({
  selector: 'app-bandeja-page',
  standalone: true,
  imports: [RouterLink, PanelHeaderComponent, DrawerComponent, ConfirmModalComponent],
  templateUrl: './bandeja-page.component.html',
})
export class BandejaPageComponent {
  private readonly expedientesService = inject(ExpedientesService);
  private readonly toast = inject(ToastService);

  readonly breadcrumbs: Breadcrumb[] = [{ label: 'Expedientes' }];
  readonly estadoInfo = estadoInfo;
  readonly estadosFiltro: FiltroEstado[] = ['todos', ...ORDEN_ESTADOS];

  readonly expedientes = signal<Expediente[]>(this.expedientesService.listar());
  readonly filtroEstado = signal<FiltroEstado>('todos');
  readonly busqueda = signal('');
  readonly seleccionados = signal<Set<string>>(new Set());
  readonly expedienteDrawer = signal<Expediente | null>(null);
  readonly confirmacionBulk = signal<'aprobar' | 'observar' | null>(null);

  readonly filtrados = computed(() => {
    const estado = this.filtroEstado();
    const texto = this.busqueda().trim().toLowerCase();
    return this.expedientes().filter((e) => {
      const coincideEstado = estado === 'todos' || e.estado === estado;
      const coincideTexto =
        !texto ||
        e.codigo.toLowerCase().includes(texto) ||
        e.tramiteNombre.toLowerCase().includes(texto) ||
        (e.clienteNombre ?? '').toLowerCase().includes(texto);
      return coincideEstado && coincideTexto;
    });
  });

  readonly todosSeleccionadosEnPagina = computed(
    () => this.filtrados().length > 0 && this.filtrados().every((e) => this.seleccionados().has(e.id))
  );

  estadoLabel(estado: FiltroEstado): string {
    return estado === 'todos' ? 'Todos' : estadoInfo(estado).label;
  }

  estaSeleccionado(id: string): boolean {
    return this.seleccionados().has(id);
  }

  alternarSeleccion(id: string): void {
    this.seleccionados.update((set) => {
      const copia = new Set(set);
      copia.has(id) ? copia.delete(id) : copia.add(id);
      return copia;
    });
  }

  alternarTodos(): void {
    const marcar = !this.todosSeleccionadosEnPagina();
    this.seleccionados.update((set) => {
      const copia = new Set(set);
      for (const e of this.filtrados()) {
        marcar ? copia.add(e.id) : copia.delete(e.id);
      }
      return copia;
    });
  }

  limpiarSeleccion(): void {
    this.seleccionados.set(new Set());
  }

  abrirDrawer(e: Expediente): void {
    this.expedienteDrawer.set(e);
  }

  cerrarDrawer(): void {
    this.expedienteDrawer.set(null);
  }

  asignarme(e: Expediente): void {
    this.actualizarExpediente(e.id, { asignadoA: 'Carla Ríos' });
    this.toast.mostrar(`${e.codigo} asignado a Carla Ríos.`, 'exito');
  }

  aprobar(e: Expediente): void {
    this.actualizarExpediente(e.id, { estado: 'aprobado', accionPendiente: 'Listo para programar la firma.' });
    this.toast.mostrar(`${e.codigo} fue aprobado.`, 'exito');
  }

  observar(e: Expediente): void {
    this.actualizarExpediente(e.id, { estado: 'observado', accionPendiente: 'Observado desde la bandeja. Revisa los documentos.' });
    this.toast.mostrar(`${e.codigo} fue marcado como observado.`, 'info');
  }

  pedirConfirmacionBulk(accion: 'aprobar' | 'observar'): void {
    this.confirmacionBulk.set(accion);
  }

  confirmarBulk(): void {
    const accion = this.confirmacionBulk();
    if (!accion) return;
    const ids = this.seleccionados();
    for (const id of ids) {
      if (accion === 'aprobar') {
        this.actualizarExpediente(id, { estado: 'aprobado', accionPendiente: 'Listo para programar la firma.' });
      } else {
        this.actualizarExpediente(id, { estado: 'observado', accionPendiente: 'Observado en acción masiva. Revisa los documentos.' });
      }
    }
    this.toast.mostrar(`${ids.size} expediente(s) actualizados.`, 'exito');
    this.confirmacionBulk.set(null);
    this.limpiarSeleccion();
  }

  private actualizarExpediente(id: string, cambios: Partial<Expediente>): void {
    this.expedientes.update((lista) => lista.map((e) => (e.id === id ? { ...e, ...cambios } : e)));
    const abierto = this.expedienteDrawer();
    if (abierto?.id === id) {
      this.expedienteDrawer.set({ ...abierto, ...cambios });
    }
  }
}
