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
    component: StationsComponent,
  },
  {
    path: 'carriages',
    component: CarriagesComponent,
  },
  {
    path: 'routes',
    component: RoutesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
