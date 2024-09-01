import { Component, effect, inject, input, OnInit } from '@angular/core';
import { Order } from '@features/my-orders/models';
import { FetchOrdersService } from '@features/my-orders/services';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrl: './single-order.component.scss',
})
export class SingleOrderComponent implements OnInit {
  public readonly order = input<Order>();

  private readonly fetchOrdersService = inject(FetchOrdersService);

  private isManager = false;

  private isDeletable = false;

  constructor() {
    effect(
      () => {
        const error = this.fetchOrdersService.errorSig();
        if (error) {
          // eslint-disable-next-line no-alert, no-undef, no-restricted-globals
          alert(error);
          this.fetchOrdersService.errorSig = '';
        }
      },
      { allowSignalWrites: true },
    );
  }

  public ngOnInit(): void {
    const order = this.order();
    if (order) {
      this.isDeletable = order.status === 'active';
    }
    this.isManager = true; // TODO
  }

  protected getIsDeletable(): boolean {
    return this.isDeletable;
  }

  protected onCancelOrder(): void {
    const order = this.order();
    if (order) {
      // eslint-disable-next-line no-alert, no-undef, no-restricted-globals
      if (confirm('Are you sure you want to cancel this order?')) {
        this.fetchOrdersService.cancelOrder(order.id);
      }
    }
  }

  protected getIsManager(): boolean {
    return this.isManager;
  }
}
