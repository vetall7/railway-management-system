import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationComponent } from '@features/admin/components';
import {
  AdminComponent,
  CarriagesComponent,
  RoutesComponent,
  StationsComponent,
} from '@features/admin/pages';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    NavigationComponent,
    AdminComponent,
    CarriagesComponent,
    RoutesComponent,
    StationsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
  exports: [],
  providers: [],
})
export class AdminModule {}
