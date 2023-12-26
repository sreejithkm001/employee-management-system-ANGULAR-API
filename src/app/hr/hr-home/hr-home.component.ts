import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { AppendIdPipe } from 'src/app/services/append-id.pipe';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.scss']
})
export class HrHomeComponent implements OnInit {

  public counter: number = 0;
  public timeElement!: string;
  public dateElement!: string;
  public pendingRequests: any=[];
  public editEmployee!: any;
  faUserPlus=faUserPlus;

  constructor(private _api: ApiService, private _appendid:AppendIdPipe,public _dialog: MatDialog) {
    //Getting the pending leave requests
    this.getPendingRequest();

    //Counter - No. of employees
    setInterval(() => {
      if (this.counter < 250) {
        this.counter += 1
      }
    }, 3);
  }

  ngOnInit(): void {

    //Date and time display
    setInterval(() => {
      const now = new Date();
      this.timeElement = this.formatTime(now);
      this.dateElement = this.formatDate(now);
    }, 200);

    //Refresh leave request data on db update
    this._api.RefreshRequired.subscribe((response) => {
      this.getPendingRequest();
    })

  }

  //Format current time (HH:MM AM/PM)
  formatTime(date: Date) {
    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const isAm = date.getHours() < 12;

    return `${hours12.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;

  }

  //Format date (Day, Month Date Year)
  formatDate(date: Date) {
    const DAYS = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]
      } ${date.getDate()} ${date.getFullYear()}`;
  }

  //Getting pending leave requests from db
  getPendingRequest() {
    this._api.getPendingRequest().subscribe((response) => {
      this.pendingRequests = response;
      for(let request of this.pendingRequests){
        this._appendid.transform(request)
      }
    })
  }

  //Call the mat dialog box to submit the response
  getDetails(req: any) {
    const dialogRef = this._dialog.open(LeaveRequestComponent, {
      data: req,
    });

    dialogRef.afterClosed().subscribe(result => {});    
  }
}
