/* eslint-disable import/no-extraneous-dependencies */
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateSelectorComponent,
  NoTripsComponent,
  SingleTripComponent,
  TripDetailsDialogComponent,
} from '@features/search-trip/components';
import { SearchTripsComponent } from '@features/search-trip/pages';
import {
  FetchApiDataService,
  FetchCarriagesService,
  FetchStationsService,
  FetchTripsService,
} from '@features/search-trip/services';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TabViewModule } from 'primeng/tabview';

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
  ],
  exports: [SearchTripsComponent],
  providers: [
    FetchStationsService,
    FetchTripsService,
    FetchCarriagesService,
    provideHttpClient(),
    FetchApiDataService,
  ],
})
export class SearchTripModule {}
