import { Routes } from '@angular/router';
import { authGuard } from '@shared/guards/auth.guard';
import { permissionGuard } from '@shared/guards/permission.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/search-trip/search-trip.module').then(
        (m) => m.SearchTripModule,
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/my-orders/my-orders.module').then(
        (m) => m.MyOrdersModule,
      ),
  },
  {
    path: 'auth',
    title: 'Authorization',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    title: 'AdminPage',
    canActivate: [permissionGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'profile',
    title: 'Profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent,
      ),
  },
];
