import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight whitespace-nowrap"
      [style.background]="bg"
      [style.color]="color"
    >
      <span class="h-1.5 w-1.5 shrink-0 rounded-full" [style.background]="color"></span>
      {{ label }}
    </span>
  `,
})
export class PanelBadgeComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) color!: string;
  @Input({ required: true }) bg!: string;
}
