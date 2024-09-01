import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MyOrdersComponent } from '@features/my-orders/pages';

import { FetchDataService } from './services/fetch-data.service';
import { FetchOrdersService } from './services/fetch-orders.service';
import { MyOrdersRoutingModule } from './my-orders-routing.module';

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [CommonModule, MyOrdersRoutingModule],
  providers: [provideHttpClient(), FetchDataService, FetchOrdersService],
})
export class MyOrdersModule {}
