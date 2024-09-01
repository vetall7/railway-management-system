import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderListSchema, OrderResponse } from '@features/my-orders/models';
import { map, Observable } from 'rxjs';

const authToken = 3;

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  private readonly httpClient = inject(HttpClient);

  private readonly urls = {
    orders: '/api/order',
    users: '/api/users',
  };

  public fetchAllOrders(): Observable<OrderResponse[]> {
    const params = new HttpParams().set('all', true);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.httpClient
      .get<OrderResponse[]>(this.urls.orders, { params, headers })
      .pipe(
        map((response) => {
          const validatedResponse = OrderListSchema.parse(response);
          return validatedResponse.map((order) => new OrderResponse(order));
        }),
      );
  }
}
