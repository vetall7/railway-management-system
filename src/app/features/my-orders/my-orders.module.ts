import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyOrdersComponent } from '@features/my-orders/pages';
import {
  AuthenticationService,
  FetchCarriagesService,
  FetchStationsService,
} from '@shared/services';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { SingleOrderComponent } from './components/single-order/single-order.component';
import { FetchDataService } from './services/fetch-data.service';
import { FetchOrdersService } from './services/fetch-orders.service';
import { FetchUsersService } from './services/fetch-users.service';
import { MyOrdersRoutingModule } from './my-orders-routing.module';

@NgModule({
  declarations: [MyOrdersComponent, SingleOrderComponent],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    AngularSvgIconModule.forRoot(),
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule,
    TagModule,
  ],
  providers: [
    FetchDataService,
    FetchOrdersService,
    FetchStationsService,
    FetchCarriagesService,
    ConfirmationService,
    FetchUsersService,
    AuthenticationService,
  ],
})
export class MyOrdersModule {}
