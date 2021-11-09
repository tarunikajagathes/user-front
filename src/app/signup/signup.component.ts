import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  emailAlredyExist = "";
  studentEmailcheck:any;
  formCheck=""
  constructor(private service:UserserviceService,private fb:FormBuilder,private router:Router,private validate:ValidateService) { }

  signinForm: FormGroup =this.fb.group({
    email:[null, [Validators.email, Validators.required,Validators.pattern(/(\b^(?:([a-z])(?!\2{2})){3,}(?:([0-9._])(?!\3{2})){0,4}@(?:([a-z])(?!\4{2})){5,}\.(?:([a-z])(?!\5{2})){2,4}$\b)/)]],
    username:[null,[Validators.required, Validators.pattern(/(\b(?:([A-Za-z])(?!\2{2}))+\b)/),Validators.minLength(3)]],
    role:[null,Validators.required],
    phone: [null,[Validators.minLength(10), Validators.maxLength(10), Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
    password:[null,[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
    cpassword:[null, [Validators.required]],
  },{
    validator:this.validate.checkPassword("password","cpassword")
  })

  
  public signin() {
    if(this.signinForm.valid){
      this.formCheck="";
    const data = { email: this.signinForm.value.email, username: this.signinForm.value.username, phone: this.signinForm.value.phone,role:this.signinForm.value.role, password: btoa(this.signinForm.value.password) }
    this.service.sign(data)
      .subscribe(
        data => {
          this.router.navigate(['home']);
        },err=>{
          console.log(err);
        }
      )
      this.router.navigate(['home']);
    }
    else{
      this.formCheck="Form Invalid!!"
    }
  }
 
  public emailCheckUnique() {
    this.service.emailCheckUnique(this.signinForm.value.email).subscribe(res => {
      this.studentEmailcheck = res;
      if (this.studentEmailcheck.data!="no data") {
        this.emailAlredyExist = "Someone already has this email. Try another?";
      }
      else {
        this.emailAlredyExist = "";
      }
    },err=>{
      console.log(err);
    });
  }

}
