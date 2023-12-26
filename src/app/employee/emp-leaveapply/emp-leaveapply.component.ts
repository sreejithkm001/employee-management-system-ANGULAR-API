import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { faCheckCircle, faExclamationCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-emp-leaveapply',
  templateUrl: './emp-leaveapply.component.html',
  styleUrls: ['./emp-leaveapply.component.scss']
})
export class EmpLeaveapplyComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  faQuestionCircle = faQuestionCircle;

  public currentUser!: any;
  public userInfo: any = [];
  public today!:string;
  public enddateMin!:string;

  public leaveApplicationForm!: FormGroup

  constructor(private _api: ApiService, private _fb: FormBuilder, private _snackBar: MatSnackBar) {
    //Get current date
    let date=new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if(month<10){
      this.today=year.toString()+'-0'+month.toString()+'-'+day.toString();
      this.enddateMin=year.toString()+'-0'+month.toString()+'-'+day.toString();
    }
    else{
      this.today=year.toString()+'-'+month.toString()+'-'+day.toString();
      this.enddateMin=year.toString()+'-'+month.toString()+'-'+day.toString();
    }

    //Get current user ID
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getLeaveDetailsById();
  }

  ngOnInit(): void {
    //Form definition
    this.leaveApplicationForm = this._fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      daylength: ['fullday'],
      leavetype: ['select', Validators.required],
      reason: ['', Validators.required]
    })
    //Disable the fullday/ halfday option on load 
    this.leaveApplicationForm.get('daylength')?.disable()
   
  }

  //Get leave history by ID
  getLeaveDetailsById() {
    this._api.getLeaveDetailsById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
    })
  }

  //Submit the application form
  applicationSubmit() {
    if (this.leaveApplicationForm.valid) {
      //Get no. of days
      let nodays;
      let startdate = new Date(this.leaveApplicationForm.value.startdate)
      let enddate = new Date(this.leaveApplicationForm.value.enddate)
      if (this.leaveApplicationForm.value.daylength == 'halfday') {
        nodays = 0.5;
      }
      else {
        nodays = Math.ceil((enddate.getTime() - startdate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      }

      //Submit request
      let leaveRequest = {
        employeeid: this.currentUser.id,
        type: this.leaveApplicationForm.value.leavetype,
        from: this.leaveApplicationForm.value.startdate,
        to: this.leaveApplicationForm.value.enddate,
        noofdays: nodays,
        reason: this.leaveApplicationForm.value.reason,
        status: 'Pending'
      }
      this._api.leaveRequest(leaveRequest).subscribe((response) => {
        this._snackBar.open("Successfully submitted your request", "", {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.leaveApplicationForm.reset({
          daylength: 'fullday',
          leavetype: 'select'
        })
        this.getLeaveDetailsById();
      })

    }
  }

  //Disable/enable day length option based on date selection
  checkDate() {
    
    if(this.leaveApplicationForm.value.startdate){
      this.enddateMin=this.leaveApplicationForm.value.startdate;
    }
    if (this.leaveApplicationForm.value.startdate !== this.leaveApplicationForm.value.enddate) {
      this.leaveApplicationForm.get('daylength')?.disable()
    }
    else {
      this.leaveApplicationForm.get('daylength')?.enable()
    }
  }

  //Reset form
  resetForm(){
    this.leaveApplicationForm.reset({
      daylength: 'fullday',
      leavetype: 'select'
    })
  }
}
