import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { NotAuthenticationGuard } from './core/guard/not-authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [{
      path: '',
      loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule)
    }]
  },
  {
    path: 'auth',
    canActivate: [NotAuthenticationGuard],
    children: [{
      path: '',
      loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
    }]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
