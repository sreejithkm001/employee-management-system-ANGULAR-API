import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './homepage/forgot-password/forgot-password.component';
import { HomeComponent } from './homepage/home/home.component';
import { InfoComponent } from './homepage/info/info.component';
import { LoginComponent } from './homepage/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DeactivateGuardService } from './services/deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: InfoComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'resetpassword',
        component: ForgotPasswordComponent,
      },
    ],
  },
  // lazy loading
  {
    path: 'employees',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    // login guard
    canActivate: [AuthGuardService],
    // logout guard
    canDeactivate: [DeactivateGuardService],
  },
  {
    path: 'hr',
    loadChildren: () => import('./hr/hr.module').then((m) => m.HrModule),
    // login guard
    canActivate: [AuthGuardService],
    // logout guard
    canDeactivate: [DeactivateGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
