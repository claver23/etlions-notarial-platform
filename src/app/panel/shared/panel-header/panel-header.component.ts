import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Breadcrumb {
  label: string;
  ruta?: string;
}

@Component({
  selector: 'app-panel-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './panel-header.component.html',
})
export class PanelHeaderComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() titulo = '';
  @ViewChild('buscador') buscadorRef?: ElementRef<HTMLInputElement>;

  @HostListener('document:keydown', ['$event'])
  onKeydown(evento: KeyboardEvent): void {
    const objetivo = evento.target as HTMLElement | null;
    const enCampo = objetivo && ['INPUT', 'TEXTAREA'].includes(objetivo.tagName);
    if (evento.key === '/' && !enCampo) {
      evento.preventDefault();
      this.buscadorRef?.nativeElement.focus();
    }
  }
}
