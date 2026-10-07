import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  ruta: string;
  icon: string;
}

@Component({
  selector: 'app-panel-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './panel-sidebar.component.html',
})
export class PanelSidebarComponent {
  readonly items: NavItem[] = [
    { label: 'Dashboard', ruta: '/panel/dashboard', icon: 'grid' },
    { label: 'Expedientes', ruta: '/panel/expedientes', icon: 'folder' },
    { label: 'Trámites', ruta: '/panel/tramites', icon: 'doc' },
    { label: 'Usuarios', ruta: '/panel/usuarios', icon: 'users' },
    { label: 'Auditoría', ruta: '/panel/auditoria', icon: 'clock' },
  ];
}
