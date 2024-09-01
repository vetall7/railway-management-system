/* eslint-disable no-lonely-if */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  OrderListSchema,
  OrderResponse,
  User,
  UserListSchema,
} from '@features/my-orders/models';
import { AuthenticationService } from '@shared/services';
import { catchError, map, Observable, of, throwError } from 'rxjs';

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
    const mockedData = [
      {
        id: 64,
        rideId: 45,
        routeId: 18,
        seatId: 150,
        userId: 3,
        status: 'active',
        path: [33, 5, 62, 11, 48, 34],
        carriages: [
          'carriage2',
          'carriage2',
          'carriage2',
          'carriage2',
          'carriage1',
          'carriage1',
          'carriage1',
          'carriage5',
        ],
        schedule: {
          segments: [
            {
              time: ['2024-08-08T22:19:57.708Z', '2024-08-08T23:19:57.708Z'],
              price: {
                carriage2: 210,
                carriage1: 180,
                carriage5: 150,
              },
            },
            {
              time: ['2024-08-08T23:29:57.708Z', '2024-08-09T01:29:57.708Z'],
              price: {
                carriage2: 220,
                carriage1: 185,
                'dynamic-carriage-type-7': 155,
              },
            },
            {
              time: ['2024-08-09T01:39:57.708Z', '2024-08-09T02:39:57.708Z'],
              price: {
                carriage2: 230,
                carriage1: 190,
                'dynamic-carriage-type-7': 160,
              },
            },
            {
              time: ['2024-08-09T02:49:57.708Z', '2024-08-09T04:49:57.708Z'],
              price: {
                carriage2: 240,
                carriage1: 195,
                'dynamic-carriage-type-7': 165,
              },
            },
            {
              time: ['2024-08-09T04:59:57.708Z', '2024-08-09T06:59:57.708Z'],
              price: {
                carriage2: 250,
                carriage1: 200,
                'dynamic-carriage-type-7': 170,
              },
            },
          ],
        },
      },
      {
        id: 64,
        rideId: 45,
        routeId: 18,
        seatId: 150,
        userId: 3,
        status: 'canceled',
        path: [33, 5, 62, 11, 48, 34],
        carriages: [
          'carriage2',
          'carriage2',
          'carriage2',
          'carriage2',
          'carriage1',
          'carriage1',
          'carriage1',
          'carriage5',
        ],
        schedule: {
          segments: [
            {
              time: ['2024-08-08T22:19:57.708Z', '2024-08-08T23:19:57.708Z'],
              price: {
                carriage2: 210,
                carriage1: 180,
                carriage5: 150,
              },
            },
            {
              time: ['2024-08-08T23:29:57.708Z', '2024-08-09T01:29:57.708Z'],
              price: {
                carriage2: 220,
                carriage1: 185,
                'dynamic-carriage-type-7': 155,
              },
            },
            {
              time: ['2024-08-09T01:39:57.708Z', '2024-08-09T02:39:57.708Z'],
              price: {
                carriage2: 230,
                carriage1: 190,
                'dynamic-carriage-type-7': 160,
              },
            },
            {
              time: ['2024-08-09T02:49:57.708Z', '2024-08-09T04:49:57.708Z'],
              price: {
                carriage2: 240,
                carriage1: 195,
                'dynamic-carriage-type-7': 165,
              },
            },
            {
              time: ['2024-08-09T04:59:57.708Z', '2024-08-09T06:59:57.708Z'],
              price: {
                carriage2: 250,
                carriage1: 200,
                'dynamic-carriage-type-7': 170,
              },
            },
          ],
        },
      },
    ];

    return of(mockedData).pipe(
      map((response) => {
        const validatedResponse = OrderListSchema.parse(response);
        return validatedResponse.map((order) => new OrderResponse(order));
      }),
    );

    // TODO : uncomment this code when the backend is ready

    // const isManager = this.authService.isManager();
    // const params = new HttpParams().set('all', isManager ? 'true' : 'false');

    // return this.httpClient.get<OrderResponse[]>(this.urls.orders, {params}).pipe(
    //   map((response) => {
    //     const validatedResponse = OrderListSchema.parse(response);
    //     return validatedResponse.map((order) => new OrderResponse(order));
    //   }),
    // );
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
