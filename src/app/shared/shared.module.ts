import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import {CanDeactivateConfirmComponent} from './can-deactivate-confirm/can-deactivate-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import {EmpPersonalDataComponent} from './emp-personal-data/emp-personal-data.component';
import {EmpAcademicDataComponent} from './emp-academic-data/emp-academic-data.component';

@NgModule({
  declarations: [
    CanDeactivateConfirmComponent,
    EmpPersonalDataComponent,
    EmpAcademicDataComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports:[
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CanDeactivateConfirmComponent,
    EmpPersonalDataComponent,
    EmpAcademicDataComponent
  ]
})
export class SharedModule { }
