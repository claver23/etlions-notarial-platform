import { Component, inject, signal } from '@angular/core';
import { UsuariosInternosService } from '../../../core/services/panel.service';
import { PanelHeaderComponent, Breadcrumb } from '../../shared/panel-header/panel-header.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { usuarioEstadoInfo } from '../../../core/services/panel-estado.util';
import { RolInterno, UsuarioInterno } from '../../../core/models/usuario-interno.model';

const ROL_LABEL: Record<RolInterno, string> = {
  admin: 'Administrador',
  notario: 'Notario',
  validador: 'Validador',
  asistente: 'Asistente',
};

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [PanelHeaderComponent, ConfirmModalComponent],
  templateUrl: './usuarios-page.component.html',
})
export class UsuariosPageComponent {
  private readonly servicio = inject(UsuariosInternosService);
  private readonly toast = inject(ToastService);

  readonly breadcrumbs: Breadcrumb[] = [{ label: 'Usuarios' }];
  readonly estadoInfo = usuarioEstadoInfo;
  readonly rolLabel = ROL_LABEL;
  readonly roles = Object.keys(ROL_LABEL) as RolInterno[];

  readonly usuarios = signal<UsuarioInterno[]>(this.servicio.listar());
  readonly modalInvitarAbierto = signal(false);
  readonly usuarioRevocar = signal<UsuarioInterno | null>(null);

  readonly correoNuevo = signal('');
  readonly rolNuevo = signal<RolInterno>('asistente');

  abrirInvitar(): void {
    this.correoNuevo.set('');
    this.rolNuevo.set('asistente');
    this.modalInvitarAbierto.set(true);
  }

  enviarInvitacion(): void {
    const correo = this.correoNuevo().trim();
    if (!correo) return;
    const nuevo: UsuarioInterno = {
      id: `u-${Date.now()}`,
      nombre: correo.split('@')[0],
      correo,
      rol: this.rolNuevo(),
      estado: 'invitado',
      invitadoEl: new Date().toISOString().slice(0, 10),
    };
    this.usuarios.update((lista) => [nuevo, ...lista]);
    this.toast.mostrar(`Invitación enviada a ${correo}.`, 'exito');
    this.modalInvitarAbierto.set(false);
  }

  cambiarRol(u: UsuarioInterno, rol: RolInterno): void {
    this.usuarios.update((lista) => lista.map((x) => (x.id === u.id ? { ...x, rol } : x)));
    this.toast.mostrar(`${u.nombre} ahora tiene el rol ${ROL_LABEL[rol]}.`, 'info');
  }

  pedirRevocar(u: UsuarioInterno): void {
    this.usuarioRevocar.set(u);
  }

  confirmarRevocar(): void {
    const u = this.usuarioRevocar();
    if (!u) return;
    this.usuarios.update((lista) => lista.map((x) => (x.id === u.id ? { ...x, estado: 'revocado' } : x)));
    this.toast.mostrar(`Se revocó el acceso de ${u.nombre}.`, 'error');
    this.usuarioRevocar.set(null);
  }
}
