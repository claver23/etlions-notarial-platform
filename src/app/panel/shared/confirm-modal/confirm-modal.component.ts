import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    @if (abierto) {
      <div class="fixed inset-0 z-[70] flex items-center justify-center px-4">
        <button
          type="button"
          class="absolute inset-0 bg-[var(--color-navy-950)]/40"
          aria-label="Cancelar"
          (click)="cancelar.emit()"
        ></button>
        <div
          class="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          role="alertdialog"
          aria-modal="true"
          [attr.aria-label]="titulo"
        >
          <h2 class="text-base font-bold tracking-tight text-[var(--color-navy-900)]">{{ titulo }}</h2>
          <p class="mt-2 text-sm text-[var(--color-ink-500)]">{{ mensaje }}</p>
          <div class="mt-6 flex justify-end gap-2.5">
            <button
              type="button"
              class="rounded-lg border border-[var(--color-sand-100)] px-4 py-2 text-sm font-semibold text-[var(--color-navy-900)] transition hover:bg-[var(--color-sand-50)]"
              (click)="cancelar.emit()"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="rounded-lg px-4 py-2 text-sm font-semibold text-white transition"
              [class]="destructivo ? 'bg-[var(--color-alert-500)] hover:bg-[var(--color-alert-600)]' : 'bg-[var(--color-coral-500)] hover:bg-[var(--color-coral-600)]'"
              (click)="confirmar.emit()"
            >
              {{ textoConfirmar }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmModalComponent {
  @Input() abierto = false;
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) mensaje!: string;
  @Input() textoConfirmar = 'Confirmar';
  @Input() destructivo = false;
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
}
