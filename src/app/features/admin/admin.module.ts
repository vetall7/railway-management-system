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
import { LoaderComponent } from '@shared/components';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
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
    InputTextModule,
    CalendarModule,
    DialogModule,
    LoaderComponent,
  ],
  exports: [],
  providers: [],
})
export class AdminModule {}
