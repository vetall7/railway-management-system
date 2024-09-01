import { Routes } from '@angular/router';
import { permissionGuard } from '@shared/guards/permission.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/search-trip/search-trip.module').then(
        (m) => m.SearchTripModule,
      ),
    pathMatch: 'full',
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
    path: '**',
    title: 'Not Found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent,
      ),
  },
];
