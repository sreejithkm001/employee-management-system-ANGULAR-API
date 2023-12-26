import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-emp-personal-data',
  templateUrl: './emp-personal-data.component.html',
  styleUrls: ['./emp-personal-data.component.scss']
})
export class EmpPersonalDataComponent implements OnInit {

  faEdit = faEdit;
  public currentUser!: any;
  public userInfo: any;
  public personalDataForm!: FormGroup;

  constructor(private _api: ApiService, private _fb: FormBuilder, private _snackBar: MatSnackBar) {
    //Get the current user ID
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    //Get employee details by ID
    this.getEmployeeById();
  }

  ngOnInit(): void {
    //Refresh data based on db update
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployeeById();
    })
    //Personal data form definition
    this.personalDataForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      bloodgroup: ['select', Validators.required],
      email: ['', Validators.required],
      gender: ['male', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      fbid: ['', Validators.required],
      instaid: ['', Validators.required],
      linkedinid: ['', Validators.required]
    })
  }

   //Get employee details by ID
  getEmployeeById() {
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
      this.displayResult()
    })
  }

  //Load values tha are already stored in db
  displayResult() {
    this.personalDataForm.get('firstname')?.setValue(this.userInfo.firstname);
    this.personalDataForm.get('lastname')?.setValue(this.userInfo.lastname);
    this.personalDataForm.get('age')?.setValue(this.userInfo.age);
    this.personalDataForm.get('dob')?.setValue(this.userInfo.dob);
    this.personalDataForm.get('bloodgroup')?.setValue(this.userInfo.bloodgroup);
    this.personalDataForm.get('gender')?.setValue(this.userInfo.gender);
    this.personalDataForm.get('email')?.setValue(this.userInfo.email);
    this.personalDataForm.get('contact')?.setValue(this.userInfo.contact);
    this.personalDataForm.get('address')?.setValue(this.userInfo.address);
    this.personalDataForm.get('fbid')?.setValue(this.userInfo.fb);
    this.personalDataForm.get('instaid')?.setValue(this.userInfo.insta);
    this.personalDataForm.get('linkedinid')?.setValue(this.userInfo.linkedin);
    this.personalDataForm.disable()
    document.getElementById('btnpersonal')?.style.setProperty("display", "none")
  }

  //Make the form editable
  editForm() {
    this.personalDataForm.enable()
    document.getElementById('btnpersonal')?.style.setProperty("display", "block")
  }

  //Save the details to db
  saveDetails() {
    if (this.personalDataForm.valid) {
      let userDetails = {
        id: this.userInfo.id,
        firstname: this.personalDataForm.value.firstname,
        lastname: this.personalDataForm.value.lastname,
        age: this.personalDataForm.value.age,
        dob: this.personalDataForm.value.dob,
        bloodgroup: this.personalDataForm.value.bloodgroup,
        gender: this.personalDataForm.value.gender,
        email: this.personalDataForm.value.email,
        contact: this.personalDataForm.value.contact,
        address: this.personalDataForm.value.address,
        fb: this.personalDataForm.value.fbid,
        insta: this.personalDataForm.value.instaid,
        linkedin: this.personalDataForm.value.linkedinid
      }
      this._api.updatePersonalInfo(userDetails).subscribe((response) => {
        this._snackBar.open("Updated successfully", "", {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      })
      this.personalDataForm.disable()
      document.getElementById('btnpersonal')?.style.setProperty("display", "none")
    }

  }

  //Cancel with out editing
  cancel() {
    this.personalDataForm.disable()
    document.getElementById('btnpersonal')?.style.setProperty("display", "none")
  }

}
