import {Routes} from '@angular/router';
import {authGuard} from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home', loadComponent: () => import('./shareds/modules/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];
