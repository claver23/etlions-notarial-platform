import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TramitesService } from '../../core/services/tramites.service';
import { Tramite } from '../../core/models/tramite.model';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog-page.component.html',
})
export class CatalogPageComponent {
  readonly query = signal('');
  readonly categoriaActiva = signal<string | null>(null);

  private readonly todos: Tramite[];
  readonly categorias: string[];
  readonly resultados = computed(() => {
    const q = this.query().trim().toLowerCase();
    const cat = this.categoriaActiva();
    return this.todos.filter((t) => {
      const coincideTexto = !q || t.nombre.toLowerCase().includes(q) || t.resumen.toLowerCase().includes(q);
      const coincideCategoria = !cat || t.categoria === cat;
      return coincideTexto && coincideCategoria;
    });
  });

  constructor(private readonly tramites: TramitesService) {
    this.todos = this.tramites.listar();
    this.categorias = this.tramites.categorias();
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaActiva.set(this.categoriaActiva() === categoria ? null : categoria);
  }

  limpiarFiltros() {
    this.query.set('');
    this.categoriaActiva.set(null);
  }
}
