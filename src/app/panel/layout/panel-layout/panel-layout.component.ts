import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelSidebarComponent } from '../../shared/panel-sidebar/panel-sidebar.component';
import { ToastHostComponent } from '../../shared/toast/toast-host.component';

@Component({
  selector: 'app-panel-layout',
  standalone: true,
  imports: [RouterOutlet, PanelSidebarComponent, ToastHostComponent],
  template: `
    <div class="flex h-screen bg-white">
      <app-panel-sidebar />
      <div class="flex min-w-0 flex-1 flex-col overflow-y-auto bg-[var(--color-sand-50)]">
        <router-outlet />
      </div>
    </div>
    <app-toast-host />
  `,
})
export class PanelLayoutComponent {}
