import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  public loginForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _api: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //Login form definition
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    //Login function
    if (this.loginForm.valid) {
      let username = this.loginForm.value.username;
      let password = this.loginForm.value.password;
      this._api.getUsers(username).subscribe((response: any) => {
        let user = response[0];
        if (user.password == password) {
          user.active = 1;
          this._api.makeActive(user).subscribe((response) => {});
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (user.category == 'hr') {
            this._router.navigateByUrl('hr');
          } else if (user.category == 'emp') {
            this._router.navigateByUrl('employees');
          }
        } else {
          // snackbar for popup message
          this._snackBar.open('Incorrect username or password', '', {
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
          this.loginForm.reset();
        }
      });
    }
  }

  //Password vilibility change
  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
