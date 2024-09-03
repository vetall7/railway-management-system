import { Component, inject, OnInit } from '@angular/core';
import { FetchOrdersService } from '@features/my-orders/services';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent implements OnInit {
  protected readonly fetchOrdersService = inject(FetchOrdersService);

  protected readonly orders = this.fetchOrdersService.getOrders;

  public ngOnInit(): void {
    this.fetchOrdersService.fetchOrders();
  }
}
