import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-host',
  standalone: true,
  template: `
    <div class="pointer-events-none fixed bottom-5 right-5 z-[80] flex flex-col gap-2">
      @for (m of toast.mensajes(); track m.id) {
        <div
          class="pointer-events-auto flex min-w-[260px] max-w-sm items-start gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg"
          [class]="claseFondo(m.tipo)"
          role="status"
        >
          <span>{{ m.texto }}</span>
          <button
            type="button"
            class="ml-auto shrink-0 text-xs font-semibold opacity-70 hover:opacity-100"
            (click)="toast.descartar(m.id)"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastHostComponent {
  readonly toast = inject(ToastService);

  claseFondo(tipo: string): string {
    if (tipo === 'exito') return 'border-[var(--color-success-500)] bg-white text-[var(--color-success-600)]';
    if (tipo === 'error') return 'border-[var(--color-alert-500)] bg-white text-[var(--color-alert-600)]';
    return 'border-[var(--color-navy-300)] bg-white text-[var(--color-navy-900)]';
  }
}
