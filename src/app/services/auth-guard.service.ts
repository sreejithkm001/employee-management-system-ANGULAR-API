import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //Login based on the local storage value
    if(localStorage.getItem('currentUser')){
      return true;
    }
    else{
      this._router.navigateByUrl('');
      return false;
    }
  }
}
