import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CatalogPageComponent } from './features/catalog/catalog-page.component';
import { TramiteDetailPageComponent } from './features/tramite-detail/tramite-detail-page.component';
import { MisTramitesPageComponent } from './features/mis-tramites/mis-tramites-page.component';
import { ExpedienteDetailPageComponent } from './features/expediente-detail/expediente-detail-page.component';
import { FirmaPageComponent } from './features/firma/firma-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: CatalogPageComponent, title: 'ETLIONS NOTARIAL — Trámites notariales' },
      { path: 'tramite/:id', component: TramiteDetailPageComponent, title: 'Detalle del trámite — ETLIONS NOTARIAL' },
      { path: 'mis-tramites', component: MisTramitesPageComponent, title: 'Mis trámites — ETLIONS NOTARIAL' },
      { path: 'expediente/:id', component: ExpedienteDetailPageComponent, title: 'Detalle del expediente — ETLIONS NOTARIAL' },
    ],
  },
  { path: 'firma/:token', component: FirmaPageComponent, title: 'Firmar documento — ETLIONS NOTARIAL' },
  { path: '**', redirectTo: '' },
];
