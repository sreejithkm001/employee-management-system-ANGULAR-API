import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './homepage/home/home.component';
import { LoginComponent } from './homepage/login/login.component';
import { InfoComponent } from './homepage/info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './homepage/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppendIdPipe } from './services/append-id.pipe';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InfoComponent,
    ForgotPasswordComponent,
    AppendIdPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatDialogModule
  ],
  providers: [
    AppendIdPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
