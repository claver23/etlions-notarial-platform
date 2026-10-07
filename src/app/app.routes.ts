import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CatalogPageComponent } from './features/catalog/catalog-page.component';
import { TramiteDetailPageComponent } from './features/tramite-detail/tramite-detail-page.component';
import { MisTramitesPageComponent } from './features/mis-tramites/mis-tramites-page.component';
import { ExpedienteDetailPageComponent } from './features/expediente-detail/expediente-detail-page.component';
import { FirmaPageComponent } from './features/firma/firma-page.component';
import { PanelLayoutComponent } from './panel/layout/panel-layout/panel-layout.component';
import { DashboardPageComponent } from './panel/features/dashboard/dashboard-page.component';
import { BandejaPageComponent } from './panel/features/bandeja/bandeja-page.component';
import { ExpedientePanelPageComponent } from './panel/features/expediente-panel/expediente-panel-page.component';
import { CatalogoPageComponent } from './panel/features/catalogo/catalogo-page.component';
import { ConfiguradorPageComponent } from './panel/features/configurador/configurador-page.component';
import { UsuariosPageComponent } from './panel/features/usuarios/usuarios-page.component';
import { AuditoriaPageComponent } from './panel/features/auditoria/auditoria-page.component';

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
  {
    path: 'panel',
    component: PanelLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent, title: 'Dashboard — Panel de notaría' },
      { path: 'expedientes', component: BandejaPageComponent, title: 'Bandeja de expedientes — Panel de notaría' },
      { path: 'expedientes/:id', component: ExpedientePanelPageComponent, title: 'Detalle del expediente — Panel de notaría' },
      { path: 'tramites', component: CatalogoPageComponent, title: 'Catálogo de trámites — Panel de notaría' },
      { path: 'tramites/nuevo', component: ConfiguradorPageComponent, title: 'Nuevo trámite — Panel de notaría' },
      { path: 'tramites/:id/editar', component: ConfiguradorPageComponent, title: 'Configurar trámite — Panel de notaría' },
      { path: 'usuarios', component: UsuariosPageComponent, title: 'Usuarios internos — Panel de notaría' },
      { path: 'auditoria', component: AuditoriaPageComponent, title: 'Reportes y auditoría — Panel de notaría' },
    ],
  },
  { path: '**', redirectTo: '' },
];
