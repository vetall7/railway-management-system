import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchTripsComponent } from '@features/search-trip/pages';
import { SearchAutocompleteService } from '@features/search-trip/services';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [SearchTripsComponent],
  imports: [
    CommonModule,
    CalendarModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SearchTripsComponent],
  providers: [SearchAutocompleteService, provideHttpClient()],
})
export class SearchTripModule {}
