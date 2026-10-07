import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tramite/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'expediente/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'firma/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: 'panel/expedientes/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'panel/tramites/:id/editar',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
