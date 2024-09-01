import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    TrainStationsComponent,
    TripDetailsComponent,
    CarriageTypeTabsComponent,
    BookSeatComponent,
  ],
  imports: [
    CommonModule,
    SearchTripRoutingModule,
    RouterLink,
    TabViewModule,
    TrainCarComponent,
    FindCarriageTypePipe,
    Button,
  ],
  exports: [],
  providers: [SearchTripDetailService],
})
export class SearchTripModule {}
