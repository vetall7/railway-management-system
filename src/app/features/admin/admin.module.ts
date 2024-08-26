import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  FormRouterComponent,
  FormStationComponent,
  LoaderComponent,
  MessageComponent,
  NavigationComponent,
  RouterInfoComponent,
  StationInfoComponent,
} from '@features/admin/components';
import {
  AdminComponent,
  CarriagesComponent,
  RoutesComponent,
  StationsComponent,
} from '@features/admin/pages';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AdminEffects } from './store/effects/admin.effects';
import { adminReducer } from './store/reducers/admin.reducer';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    NavigationComponent,
    AdminComponent,
    CarriagesComponent,
    RoutesComponent,
    StationsComponent,
    FormStationComponent,
    StationInfoComponent,
    LoaderComponent,
    MessageComponent,
    FormRouterComponent,
    RouterInfoComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
  exports: [],
  providers: [],
})
export class AdminModule {}
