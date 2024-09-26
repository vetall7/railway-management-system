/* eslint-disable import/no-extraneous-dependencies */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  DateSelectorComponent,
  SingleTripComponent,
  TripDetailsDialogComponent,
} from '@features/search-trip/components';
import { BookSeatComponent } from '@features/search-trip/components/book-seat/book-seat.component';
import { CarriageTypeTabsComponent } from '@features/search-trip/components/carriage-type-tabs/carriage-type-tabs.component';
import { TrainStationsComponent } from '@features/search-trip/components/train-stations/train-stations.component';
import { SearchTripsComponent, TripDetailsComponent } from '@features/search-trip/pages';
import { FindCarriageTypePipe } from '@features/search-trip/pipes';
import { SearchTripRoutingModule } from '@features/search-trip/search-trip-routing.module';
import { FetchTripsService } from '@features/search-trip/services';
import { SearchTripDetailService } from '@features/search-trip/services/search-trip-detail.service';
import {
  LoaderComponent,
  NoTripsComponent,
  PaymentComponent,
  TrainCarComponent,
} from '@shared/components';
import { SuccessComponent } from '@shared/components/success/success.component';
import { FetchApiDataService, FetchCarriagesService, FetchStationsService } from '@shared/services';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { StepperModule } from 'primeng/stepper';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    SearchTripsComponent,
    SingleTripComponent,
    DateSelectorComponent,
    TripDetailsDialogComponent,
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
    NoTripsComponent,
    StepperModule,
    PaymentComponent,
    SuccessComponent,
    LoaderComponent,
  ],
  exports: [SearchTripsComponent],
  providers: [
    FetchStationsService,
    FetchTripsService,
    FetchCarriagesService,
    FetchApiDataService,
    SearchTripDetailService,
  ],
})
export class SearchTripModule {}
