import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, OnChanges {

  public createEmployeeForm !: FormGroup;
  @Input() editEmployee!: any;
  public fileName: string = 'No files uploaded';
  public editId!: number;
  public leaveDetails!:any;
  
  constructor(private _fb: FormBuilder, private _api: ApiService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    //Create form definition
    this.createEmployeeForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      bloodgroup: ['select', Validators.required],
      email: ['', Validators.required],
      gender: ['male', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      profilepic: [''],
      qualification: ['', Validators.required],
      subject: ['', Validators.required],
      university: ['', Validators.required],
      percentage: ['', Validators.required],
      department: ['select', Validators.required],
      designation: ['', Validators.required],
      fbid: ['', Validators.required],
      instaid: ['', Validators.required],
      linkedinid: ['', Validators.required]
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    //Check the Input() varibale change
    if (changes['editEmployee'].currentValue != undefined) {
      this.createEmployeeForm.get('firstname')?.setValue(this.editEmployee.firstname);
      this.createEmployeeForm.get('lastname')?.setValue(this.editEmployee.lastname);
      this.createEmployeeForm.get('age')?.setValue(this.editEmployee.age);
      this.createEmployeeForm.get('dob')?.setValue(this.editEmployee.dob);
      this.createEmployeeForm.get('bloodgroup')?.setValue(this.editEmployee.bloodgroup);
      this.createEmployeeForm.get('gender')?.setValue(this.editEmployee.gender);
      this.createEmployeeForm.get('email')?.setValue(this.editEmployee.email);
      this.createEmployeeForm.get('contact')?.setValue(this.editEmployee.contact);
      this.createEmployeeForm.get('department')?.setValue(this.editEmployee.department);
      this.createEmployeeForm.get('designation')?.setValue(this.editEmployee.designation);
      this.createEmployeeForm.get('address')?.setValue(this.editEmployee.address);
      this.createEmployeeForm.get('qualification')?.setValue(this.editEmployee.qualification);
      this.createEmployeeForm.get('subject')?.setValue(this.editEmployee.course);
      this.createEmployeeForm.get('university')?.setValue(this.editEmployee.university);
      this.createEmployeeForm.get('percentage')?.setValue(this.editEmployee.percentage);
      this.createEmployeeForm.get('fbid')?.setValue(this.editEmployee.fb);
      this.createEmployeeForm.get('instaid')?.setValue(this.editEmployee.insta);
      this.createEmployeeForm.get('linkedinid')?.setValue(this.editEmployee.linkedin);
      this.fileName = this.editEmployee.image;
      this.editId = this.editEmployee.id;
      this.leaveDetails=this.editEmployee.leavedetails;
    }
  }

  //Set file name on choose file
  setFileName(event: any) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    }
  }

  
  saveEmpDetails() {
    if (this.createEmployeeForm.valid && this.createEmployeeForm.value.bloodgroup != 'select' && this.createEmployeeForm.value.department != 'select') {
      //If employee edit call in modal
      if (this.editId) {
        let userInfo = {
          id: this.editId,
          firstname: this.createEmployeeForm.value.firstname,
          lastname: this.createEmployeeForm.value.lastname,
          age: this.createEmployeeForm.value.age,
          dob: this.createEmployeeForm.value.dob,
          bloodgroup: this.createEmployeeForm.value.bloodgroup,
          gender: this.createEmployeeForm.value.gender,
          email: this.createEmployeeForm.value.email,
          contact: this.createEmployeeForm.value.contact,
          address: this.createEmployeeForm.value.address,
          image: this.fileName,
          qualification: this.createEmployeeForm.value.qualification,
          course: this.createEmployeeForm.value.subject,
          university: this.createEmployeeForm.value.university,
          percentage: this.createEmployeeForm.value.percentage,
          department: this.createEmployeeForm.value.department,
          designation: this.createEmployeeForm.value.designation,
          fb: this.createEmployeeForm.value.fbid,
          insta: this.createEmployeeForm.value.instaid,
          linkedin: this.createEmployeeForm.value.linkedinid,
          leavedetails:this.leaveDetails
        }
        this._api.editEmployee(userInfo).subscribe((response) => {
        })
      }
      else {
        //Creating a new employee details
        let userInfo = {
          firstname: this.createEmployeeForm.value.firstname,
          lastname: this.createEmployeeForm.value.lastname,
          age: this.createEmployeeForm.value.age,
          dob: this.createEmployeeForm.value.dob,
          bloodgroup: this.createEmployeeForm.value.bloodgroup,
          gender: this.createEmployeeForm.value.gender,
          email: this.createEmployeeForm.value.email,
          contact: this.createEmployeeForm.value.contact,
          address: this.createEmployeeForm.value.address,
          image: this.fileName,
          qualification: this.createEmployeeForm.value.qualification,
          course: this.createEmployeeForm.value.subject,
          university: this.createEmployeeForm.value.university,
          percentage: this.createEmployeeForm.value.percentage,
          department: this.createEmployeeForm.value.department,
          designation: this.createEmployeeForm.value.designation,
          fb: this.createEmployeeForm.value.fbid,
          insta: this.createEmployeeForm.value.instaid,
          linkedin: this.createEmployeeForm.value.linkedinid,
          leavedetails:[]
        }
        this._api.addEmployee(userInfo).subscribe((response) => {
          
          this._snackBar.open("New employee added successfully", "", {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
          this.createEmployeeForm.reset({
            bloodgroup: 'select',
            gender: 'male',
            department: 'select'
          })
          this.fileName = 'No files uploaded';
        })
      }
    }
  }

  //Reset form details
  resetForm() {
    this.createEmployeeForm.reset({
      bloodgroup: 'select',
      gender: 'male',
      department: 'select'
    });
    this.fileName = 'No files uploaded';
  }
}
