/* eslint-disable no-lonely-if */
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  OrderListSchema,
  OrderResponse,
  User,
  UserListSchema,
} from '@features/my-orders/models';
import { AuthenticationService } from '@shared/services';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  private readonly httpClient = inject(HttpClient);

  private readonly authService = inject(AuthenticationService);

  private readonly urls = {
    orders: '/api/order',
    users: '/api/users',
  };

  // eslint-disable-next-line class-methods-use-this
  public fetchAllOrders(): Observable<OrderResponse[]> {
    const isManager = this.authService.isManager();
    const params = new HttpParams().set('all', isManager ? 'true' : 'false');

    return this.httpClient
      .get<OrderResponse[]>(this.urls.orders, { params })
      .pipe(
        map((response) => {
          const validatedResponse = OrderListSchema.parse(response);
          return validatedResponse.map((order) => new OrderResponse(order));
        }),
      );
  }

  public deleteOrder(orderId: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.urls.orders}/${orderId}`)
      .pipe(catchError(this.handleError));
  }

  // eslint-disable-next-line class-methods-use-this
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        if (error.error.reason === 'orderNotFound') {
          errorMessage = 'Order not found';
        } else if (error.error.reason === 'orderNotActive') {
          errorMessage = 'Order is not active';
        }
      } else {
        errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  public fetchAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.urls.users).pipe(
      map((response) => {
        const validatedResponse = UserListSchema.parse(response);
        return validatedResponse.map((user) => new User(user));
      }),
    );
  }
}
