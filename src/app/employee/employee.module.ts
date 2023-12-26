import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpNavbarComponent } from './emp-navbar/emp-navbar.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpLeaveapplyComponent } from './emp-leaveapply/emp-leaveapply.component';
import { EmpLeaveDataComponent } from './emp-leave-data/emp-leave-data.component';
import { EmpFooterComponent } from './emp-footer/emp-footer.component';
import {MatMenuModule} from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EmpHomeComponent,
    EmpNavbarComponent,
    EmpDashboardComponent,
    EmpLeaveapplyComponent,
    EmpLeaveDataComponent,
    EmpFooterComponent
  ],
  imports: [
    EmployeeRoutingModule,
    MatMenuModule,
    SharedModule
  ]
})
export class EmployeeModule { }
