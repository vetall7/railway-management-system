/* eslint-disable import/no-extraneous-dependencies */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateSelectorComponent,
  NoTripsComponent,
  SingleTripComponent,
  TripDetailsDialogComponent,
} from '@features/search-trip/components';
import { SearchTripsComponent } from '@features/search-trip/pages';
import { FetchTripsService } from '@features/search-trip/services';
import {
  FetchApiDataService,
  FetchCarriagesService,
  FetchStationsService,
} from '@shared/services';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TabViewModule } from 'primeng/tabview';

import { SearchTripRoutingModule } from './search-trip-routing.module';

@NgModule({
  declarations: [
    SearchTripsComponent,
    SingleTripComponent,
    DateSelectorComponent,
    TripDetailsDialogComponent,
    NoTripsComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    DividerModule,
    DialogModule,
    FloatLabelModule,
    AngularSvgIconModule.forRoot(),
    SearchTripRoutingModule,
  ],
  exports: [SearchTripsComponent],
  providers: [
    FetchStationsService,
    FetchTripsService,
    FetchCarriagesService,
    FetchApiDataService,
  ],
})
export class SearchTripModule {}
