import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  SearchTripsComponent,
  TripDetailsComponent,
} from '@features/search-trip/pages';

const routes: Routes = [
  {
    path: '',
    component: SearchTripsComponent,
  },
  {
    path: 'trip/:id',
    component: TripDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTripRoutingModule {}
