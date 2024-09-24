import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CarriagesComponent,
  RidesComponent,
  RoutesComponent,
  StationsComponent,
} from '@features/admin/pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stations',
    pathMatch: 'full',
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
  {
    path: 'routes/:id',
    title: 'RidePage',
    component: RidesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
