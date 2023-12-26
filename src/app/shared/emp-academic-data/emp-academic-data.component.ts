import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-academic-data',
  templateUrl: './emp-academic-data.component.html',
  styleUrls: ['./emp-academic-data.component.scss']
})
export class EmpAcademicDataComponent implements OnInit {

  faEdit = faEdit;
  public currentUser!: any;
  public userInfo: any;
  public academicDataForm!: FormGroup;

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

    //Academic data form definition
    this.academicDataForm = this._fb.group({
      qualification: ['', Validators.required],
      course: ['', Validators.required],
      university: ['', Validators.required],
      percentage: ['', Validators.required]
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
    this.academicDataForm.get('qualification')?.setValue(this.userInfo.qualification);
    this.academicDataForm.get('course')?.setValue(this.userInfo.course);
    this.academicDataForm.get('university')?.setValue(this.userInfo.university);
    this.academicDataForm.get('percentage')?.setValue(this.userInfo.percentage);
    this.academicDataForm.disable();
    document.getElementById('btnacademic')?.style.setProperty("display", "none");
  }

  //Make the form editable
  editForm() {
    this.academicDataForm.enable();
    document.getElementById('btnacademic')?.style.setProperty("display", "block");
  }

  //Save the details to db
  saveDetails() {
    if(this.academicDataForm.valid){
      let userDetails = {
        id: this.userInfo.id,
        qualification: this.academicDataForm.value.qualification,
        course: this.academicDataForm.value.course,
        university: this.academicDataForm.value.university,
        percentage: this.academicDataForm.value.percentage
        
      }
      this._api.updatePersonalInfo(userDetails).subscribe((response) => {
        // snackbar for popup messages
        this._snackBar.open("Updated successfully", "", {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      })
      this.academicDataForm.disable()
      document.getElementById('btnacademic')?.style.setProperty("display", "none")
    }
  }

  //Cancel with out editing
  cancel(){
    this.academicDataForm.disable()
      document.getElementById('btnacademic')?.style.setProperty("display", "none")
  }
}

