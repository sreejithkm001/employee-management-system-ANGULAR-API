import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faPhoneAlt, faAt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { AppendIdPipe } from 'src/app/services/append-id.pipe';

@Component({
  selector: 'app-hr-profile',
  templateUrl: './hr-profile.component.html',
  styleUrls: ['./hr-profile.component.scss']
})
export class HrProfileComponent implements OnInit {
  public currentUser!: any;
  public userInfo: any = {
    image: ''
  };

  faPhoneAlt = faPhoneAlt;
  faAt = faAt;
  faEdit = faEdit;

  public fileName!: string;

  constructor(private _api: ApiService, private _snackBar: MatSnackBar, private _appendid: AppendIdPipe) {
    //Get the current user ID
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    //Get the employee details by ID
    this.getEmployeeById();
  }

  ngOnInit(): void {
    //Refresh details based on db update
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployeeById();
    })
  }

  //Get employee details based on ID
  getEmployeeById() {
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
      //Generate Amigos ID based on employee ID
      this._appendid.transform(this.userInfo)
    })
  }

  //Set file name on choose new file
  setFileName(event: any) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    }
  }

  //Update the file name in db
  uploadProfilePic() {
    let userDetails = {
      id: this.currentUser.id,
      image: this.fileName
    }
    this._api.updateProfilePic(userDetails).subscribe((response) => {
      this._snackBar.open("Profile picture successfully", "", {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    })
  }
}
