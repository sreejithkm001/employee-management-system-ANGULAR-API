import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpLeaveapplyComponent } from './emp-leaveapply/emp-leaveapply.component';

const routes: Routes = [
  {
    path: '',
    component: EmpDashboardComponent,
    children: [
      {
        path: '',
        component: EmpHomeComponent,
      },
      {
        path: 'leavapply',
        component: EmpLeaveapplyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
