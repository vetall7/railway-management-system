import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookSeatComponent } from '@features/search-trip/components/book-seat/book-seat.component';
import { CarriageTypeTabsComponent } from '@features/search-trip/components/carriage-type-tabs/carriage-type-tabs.component';
import { TrainStationsComponent } from '@features/search-trip/components/train-stations/train-stations.component';
import { TripDetailsComponent } from '@features/search-trip/pages';

@NgModule({
  declarations: [
    TrainStationsComponent,
    TripDetailsComponent,
    CarriageTypeTabsComponent,
    BookSeatComponent,
  ],
  imports: [CommonModule],
  exports: [],
  providers: [],
})
export class SearchTripModule {}
