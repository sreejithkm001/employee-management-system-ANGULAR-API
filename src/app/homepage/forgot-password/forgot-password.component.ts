import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public showPassword: boolean = false;
  public showCPassword: boolean = false;
  public resetPasswordForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router, private _api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //Reset password form definition
    this.resetPasswordForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    })
  }

  //Password visibility change
  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
  cpasswordVisibility() {
    this.showCPassword = !this.showCPassword;
  }

  //Reset password function
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      let username = this.resetPasswordForm.value.username;
      let password = this.resetPasswordForm.value.password;
      let cpassword = this.resetPasswordForm.value.cpassword;
      if (password === cpassword) {
        this._api.getUsers(username).subscribe((response: any) => {
          let user=response[0]
          if (user) {
            let id = user.id;
            let userInfo={
              id,
              password
            }
            this._api.resetPassword(userInfo).subscribe((response) => {
              // snackbar for popup messages
              this._snackBar.open("Password updated successfully", "", {
                duration: 2000,
                panelClass: ['success-snackbar']
              });
              this._router.navigateByUrl('login');
            })
          }
          else {
            this._snackBar.open("Incorrect username", "", {
              duration: 2000,
              panelClass: ['error-snackbar']
            });
            this.resetPasswordForm.reset();
          }
        });
      }
    }
  }
  
}
