import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faUserLock, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { navbarData } from './nav-data';

interface sideNavToggle {
  screenWidth : number,
  collapsed : boolean
}
@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements OnInit, OnDestroy {

  collapsed=false;
  navData = navbarData;
  screenWidth =0;
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();

  faAngleDown=faAngleDown;
  faUserLock=faUserLock;
  faUser=faUser;
  faSignOutAlt=faSignOutAlt;

  public currentUser!: any;
  public userInfo: any={
    image:'1.jpg'       //Some default value
  };

  constructor(private _router:Router, private _api: ApiService) { 
    //Getting the current user ID
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    //get employee details by ID
    this.getEmployeeById();
  }

  //Get the window size on resize
  @HostListener('window:resize', ['$event'])
  //Setting variables and emit the event along with newly set variables
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth<=768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
    }
  }

  ngOnInit(): void {
    //Screen width set to current inner width
    this.screenWidth=window.innerWidth;
    if(this.screenWidth>768){
      this.collapsed=true
    }
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
    //Refresh the employee information based on db update
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployeeById();
    })
  }

  ngOnDestroy(): void {
    //Clearing local storage and setting active varable in db on destroy
    localStorage.clear();
      let user={
        id:this.currentUser.id,
        active:0
      }
      this._api.makeActive(user).subscribe((response)=>{})
  }

  //Get employee details by ID
  getEmployeeById(){
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
    })
  }

  //Logout navigate function
  logout(){
    this._router.navigateByUrl('');
  }
 
  //Toggle collapsed variable on button click
  toggleCollapse(){
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
  }

  //Close the side nav button
  closeSideNav(){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
  }
  
}
