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
import { RouterLink } from '@angular/router';
import { BookSeatComponent } from '@features/search-trip/components/book-seat/book-seat.component';
import { CarriageTypeTabsComponent } from '@features/search-trip/components/carriage-type-tabs/carriage-type-tabs.component';
import { TrainStationsComponent } from '@features/search-trip/components/train-stations/train-stations.component';
import { TripDetailsComponent } from '@features/search-trip/pages';
import { FindCarriageTypePipe } from '@features/search-trip/pipes';
import { SearchTripRoutingModule } from '@features/search-trip/search-trip-routing.module';
import { SearchTripDetailService } from '@features/search-trip/services/search-trip-detail.service';
import { TrainCarComponent } from '@shared/components';
import { Button } from 'primeng/button';



@NgModule({
  declarations: [
    SearchTripsComponent,
    SingleTripComponent,
    DateSelectorComponent,
    TripDetailsDialogComponent,
    NoTripsComponent,
    TrainStationsComponent,
    TripDetailsComponent,
    CarriageTypeTabsComponent,
    BookSeatComponent,
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
    RouterLink,
    TrainCarComponent,
    FindCarriageTypePipe,
    Button,
  ],
  exports: [SearchTripsComponent],
  providers: [
    FetchStationsService,
    FetchTripsService,
    FetchCarriagesService,
    provideHttpClient(),
    FetchApiDataService,
    SearchTripDetailService,
  ],
})
export class SearchTripModule {}
