import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchTripsComponent } from '@features/search-trip/pages';
import { SearchAutocompleteService } from '@features/search-trip/services';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TabViewModule } from 'primeng/tabview';

import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { TripDetailsDialogComponent } from './components/trip-details-dialog/trip-details-dialog.component';
import { FetchCarriagesService } from './services/fetch-carriages.service';
import { FetchTripsService } from './services/fetch-trips.service';

@NgModule({
  declarations: [
    SearchTripsComponent,
    SingleTripComponent,
    DateSelectorComponent,
    TripDetailsDialogComponent,
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
  ],
  exports: [SearchTripsComponent],
  providers: [
    SearchAutocompleteService,
    FetchTripsService,
    FetchCarriagesService,
    provideHttpClient(),
  ],
})
export class SearchTripModule {}
