import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrCreateempComponent } from './hr-createemp/hr-createemp.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { HrEmpdetailsComponent } from './hr-empdetails/hr-empdetails.component';
import { HrHomeComponent } from './hr-home/hr-home.component';
import { HrProfileComponent } from './hr-profile/hr-profile.component';

const routes: Routes = [
  {
    path:'', component:HrDashboardComponent, children:[
      
      {
        path:'', component:HrHomeComponent
      },
      {
        path:'empdetails', component:HrEmpdetailsComponent
      },
      {
        path:'createemp', component:HrCreateempComponent
      },
      {
        path:'profile', component:HrProfileComponent
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
