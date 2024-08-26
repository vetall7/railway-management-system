import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdminComponent,
  CarriagesComponent,
  RoutesComponent,
  StationsComponent,
} from '@features/admin/pages';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'stations',
    title: 'StationsPage',
    component: StationsComponent,
  },
  {
    path: 'carriages',
    title: 'CarriagesPage',
    component: CarriagesComponent,
  },
  {
    path: 'routes',
    title: 'RoutesPage',
    component: RoutesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
