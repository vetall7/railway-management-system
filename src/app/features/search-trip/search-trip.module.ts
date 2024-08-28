import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookSeatComponent } from '@features/search-trip/components/book-seat/book-seat.component';
import { CarriageTypeTabsComponent } from '@features/search-trip/components/carriage-type-tabs/carriage-type-tabs.component';
import { TrainStationsComponent } from '@features/search-trip/components/train-stations/train-stations.component';
import { TripDetailsComponent } from '@features/search-trip/pages';
import { SearchTripRoutingModule } from '@features/search-trip/search-trip-routing.module';
import { SearchTripDetailService } from '@features/search-trip/services/search-trip-detail.service';

@NgModule({
  declarations: [
    TrainStationsComponent,
    TripDetailsComponent,
    CarriageTypeTabsComponent,
    BookSeatComponent,
  ],
  imports: [CommonModule, SearchTripRoutingModule, RouterLink],
  exports: [],
  providers: [SearchTripDetailService],
})
export class SearchTripModule {}
