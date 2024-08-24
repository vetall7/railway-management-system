import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  FormStationComponent,
  NavigationComponent,
} from '@features/admin/components';
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
    FormStationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [],
})
export class AdminModule {}
