import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    title: 'AdminPage',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
];
