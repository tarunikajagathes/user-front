import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  falseUser= false;
  result: any;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })
  constructor(private service:UserserviceService,private router:Router) { }


  public login() {
    if (this.loginForm.valid) {
    this.service.checkUser(this.loginForm.value.email, btoa(this.loginForm.value.password)).subscribe( res => {
      this.result=res;
      if (this.result.data!="no data") {
        sessionStorage.setItem('currentUser', this.result.token);
        this.router.navigate(["/home"]);
      }
      else {
        this.falseUser = true;
      }
    }, err => {
      this.falseUser = true;
    })
  }
  }
}
