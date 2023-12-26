import { Component, OnInit } from '@angular/core';
import { faUser, faAt, faPhoneAlt, faMapMarked, faEdit, faTrash, faGraduationCap, faExclamationCircle, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AppendIdPipe } from 'src/app/services/append-id.pipe';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.scss']
})
export class EmpdetailsComponent implements OnInit {
  faCalender=faCalendar;
  faAt = faAt;
  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faLocation = faMapMarked;
  faEdit = faEdit;
  faTrash = faTrash;
  faGraduationCap = faGraduationCap;
  faExclamationCircle = faExclamationCircle;
  public employeesList!: any;
  public employeeListCopy!:any;
  public editEmployee!: any;

  constructor(private _api: ApiService, private _dialog: MatDialog, private _appendid:AppendIdPipe) {
    //Get employee details
    this.getEmployees();
  }

  ngOnInit(): void {
    //Refresh details on update
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployees();
    })

  }

  getEmployees() {
    //Get employee details
    this._api.getEmployees().subscribe((response) => {
      this.employeesList = response;
      this.employeeListCopy=response;

      //Attach the leave details with employee personal data
      for (let employee of this.employeesList) {
        this._api.getLeaveDetailsById(employee.id).subscribe((response) => {
          employee.leavedetails = response;
          employee.leaveRequestStatus = false;
          if (employee.leavedetails.length > 0) {
            for (let request of employee.leavedetails) {
              if (request.status == 'Pending') {
                employee.leaveRequestStatus = true;

              }
            }
          }
        })
      }

      //Generating Amigos id from employee id using Pipe
      for(let employee of this.employeesList){
        this._appendid.transform(employee)
      }
    })

  }

  //Delete employee option
  deleteEmployee(id: number, name: string) {
    let dialogRef = this._dialog.open(ConfirmationDialogComponent)
    dialogRef.afterClosed().subscribe((response) => {
      if (response == "true") {
        this._api.deleteEmployee(id).subscribe((response) => {
          this.getEmployees();
        })
      }

    })
  }

  //Get the pending leave requests if any
  getDetails(employee: any) {
    let req;
    for(let request of employee.leavedetails){
      if(request.status == 'Pending'){
        req=request
      }
    }
    const dialogRef = this._dialog.open(LeaveRequestComponent, {
      data: req,
    });

    dialogRef.afterClosed().subscribe(result => {});    
  }

  //Set the variable for passing into edit modal
  getEmpDetails(employee:any){
    this.editEmployee=employee
    this.editEmployee.leavedetails=[]
  }
}
