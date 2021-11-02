import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CreateDialogComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
  {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
