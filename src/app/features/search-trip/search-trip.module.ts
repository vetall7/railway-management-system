import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchTripsComponent } from '@features/search-trip/pages';
import { SearchAutocompleteService } from '@features/search-trip/services';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { FetchTripsService } from './services/fetch-trips.service';

@NgModule({
  declarations: [SearchTripsComponent, SingleTripComponent],
  imports: [
    CommonModule,
    CalendarModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SearchTripsComponent],
  providers: [
    SearchAutocompleteService,
    FetchTripsService,
    provideHttpClient(),
  ],
})
export class SearchTripModule {}
