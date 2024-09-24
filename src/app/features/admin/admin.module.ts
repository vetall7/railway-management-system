import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  CarriageInfoComponent,
  CarriageViewComponent,
  ConfirmComponent,
  FormRouterComponent,
  FormStationComponent,
  LoaderComponent,
  MessageComponent,
  NavigationComponent,
  RideCreateComponent,
  RideInfoComponent,
  RideInfoContentComponent,
  RouterInfoComponent,
  StationInfoComponent,
} from '@features/admin/components';
import {
  CarriagesComponent,
  RidesComponent,
  RoutesComponent,
  StationsComponent,
} from '@features/admin/pages';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Button } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { AdminEffects } from './store/effects/admin.effects';
import { adminReducer } from './store/reducers/admin.reducer';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    NavigationComponent,
    CarriagesComponent,
    RoutesComponent,
    StationsComponent,
    FormStationComponent,
    StationInfoComponent,
    LoaderComponent,
    MessageComponent,
    FormRouterComponent,
    RouterInfoComponent,
    ConfirmComponent,
    RidesComponent,
    RideInfoComponent,
    RideInfoContentComponent,
    RideCreateComponent,
    CarriageInfoComponent,
    CarriageViewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([AdminEffects]),
    SidebarModule,
    Button,
  ],
  exports: [],
  providers: [],
})
export class AdminModule {}
