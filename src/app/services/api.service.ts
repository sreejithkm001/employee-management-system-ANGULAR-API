import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _refreshRequired = new Subject<void>();

  constructor(private _http: HttpClient) {}

  get RefreshRequired() {
    return this._refreshRequired;
  }

  //to get user
  getUsers(username: string) {
    return this._http.get('http://localhost:3000/users/?username=' + username);
  }
  // to reset password
  resetPassword(userDetails: any) {
    return this._http.patch(
      'http://localhost:3000/users/' + userDetails.id,
      userDetails
    );
  }
  // to get all users
  getAllUsers() {
    return this._http.get('http://localhost:3000/users');
  }
  // to make an employee active
  makeActive(userDetails: any) {
    return this._http
      .patch('http://localhost:3000/users/' + userDetails.id, userDetails)
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
          // Manually write changes to the db.json file
          this._http.get('http://localhost:3000/db').subscribe(() => {});
        })
      );
  }

  //to get all employees
  getEmployees() {
    return this._http.get('http://localhost:3000/employees');
  }
  // to delete an employee
  deleteEmployee(id: number) {
    return this._http.delete('http://localhost:3000/employees/' + id).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }
  // to add an employee
  addEmployee(userDetails: any) {
    return this._http.post('http://localhost:3000/employees', userDetails).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }
  // to edit employee
  editEmployee(userDetails: any) {
    return this._http
      .put('http://localhost:3000/employees/' + userDetails.id, userDetails)
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
        })
      );
  }
  // to update employee personal details
  updatePersonalInfo(userDetails: any) {
    return this._http
      .patch('http://localhost:3000/employees/' + userDetails.id, userDetails)
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
        })
      );
  }
  // to update employee profile photo
  updateProfilePic(userDetails: any) {
    return this._http
      .patch('http://localhost:3000/employees/' + userDetails.id, userDetails)
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
        })
      );
  }
  // to get employee by id
  getEmployeeById(id: number) {
    return this._http.get('http://localhost:3000/employees/' + id);
  }

  //for leave request
  leaveRequest(userDetails: any) {
    return this._http.post('http://localhost:3000/leavedetails', userDetails);
  }
  // to get leave request by id
  getLeaveDetailsById(id: number) {
    return this._http.get(
      'http://localhost:3000/leavedetails/?employeeid=' + id
    );
  }
  // to perform action over a leave request
  respondLeaveRequest(response: any) {
    return this._http
      .patch('http://localhost:3000/leavedetails/' + response.id, response)
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
        })
      );
  }
  // to get approved leave details
  getApprovedLeaveDetails() {
    return this._http.get(
      'http://localhost:3000/leavedetails/?status=Approved'
    );
  }
  // to get pending leave requests
  getPendingRequest() {
    return this._http.get('http://localhost:3000/leavedetails/?status=Pending');
  }
}
