import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  template: `
    @if (abierto) {
      <div class="fixed inset-0 z-50 flex justify-end">
        <button
          type="button"
          class="absolute inset-0 bg-[var(--color-navy-950)]/30"
          aria-label="Cerrar panel de detalle"
          (click)="cerrar.emit()"
        ></button>
        <aside
          class="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[var(--color-sand-100)] bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="titulo"
        >
          <header class="flex items-start justify-between gap-3 border-b border-[var(--color-sand-100)] px-6 py-5">
            <h2 class="text-lg font-bold tracking-tight text-[var(--color-navy-900)]">{{ titulo }}</h2>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[var(--color-ink-500)] transition hover:bg-[var(--color-sand-50)] hover:text-[var(--color-navy-900)]"
              (click)="cerrar.emit()"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </button>
          </header>
          <div class="flex-1 px-6 py-5">
            <ng-content />
          </div>
        </aside>
      </div>
    }
  `,
})
export class DrawerComponent {
  @Input() abierto = false;
  @Input({ required: true }) titulo!: string;
  @Output() cerrar = new EventEmitter<void>();
}
