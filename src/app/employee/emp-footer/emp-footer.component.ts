import { Component, OnInit } from '@angular/core';
import { faEnvelope, faPhoneAlt, faMapMarked } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-emp-footer',
  templateUrl: './emp-footer.component.html',
  styleUrls: ['./emp-footer.component.scss']
})
export class EmpFooterComponent implements OnInit {

  faEnvelope=faEnvelope;
  faPhoneAlt=faPhoneAlt;
  faMapMarked=faMapMarked;

  constructor() { }

  ngOnInit(): void {
  }

}
