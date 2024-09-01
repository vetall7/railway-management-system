import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    title: 'AdminPage',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/search-trip/search-trip.module').then(
        (m) => m.SearchTripModule,
      ),
    pathMatch: 'full',
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/my-orders/my-orders.module').then(
        (m) => m.MyOrdersModule,
      ),
  },
];
