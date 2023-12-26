import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {


  constructor(private _api:ApiService, @Inject(MAT_DIALOG_DATA) public data: any,) {

   }

  ngOnInit(): void {
  }

  //Submit the response to leave request submitted by employee
  respondRequest(requestId:number, status:string){
    let response={
      id:requestId,
      status:status
    }
    this._api.respondLeaveRequest(response).subscribe((response)=>{

    })
  }
  
}
