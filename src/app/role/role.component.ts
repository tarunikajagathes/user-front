import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{

 public formCheck="";
 public details:any;

  user:FormGroup=new FormGroup({
    role: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(/(\b(?:([A-Za-z])(?!\2{2}))+\b)/)])
  })

  constructor(private dialog:MatDialog, private service:UserserviceService,private router:Router) { }

  ngOnInit(){
    this.list();
  }

  public Logout(){
    sessionStorage.removeItem('currentUser');
  }
  public list(){
    this.service.roleList().subscribe(res=>{
      this.details=res
    })
  }
  public back(){
    this.router.navigate(["home"]);
  }

  public deleteRole(role:any){
    this.service.delRole(role).subscribe(res=>{
      this.list();
    },err=>{
      alert("server error..");
    })
  }

  public save(){
    if(this.user.valid){
      this.formCheck="";
    const data = { role: this.user.value.role}
    this.service.role(data)
      .subscribe(
        err=>{
          alert("Not Allowed to change the data!!");
          this.router.navigate(['home']);
        }
      )
      this.dialog.closeAll();
      this.router.navigate(['home']);
    }
    else{
      this.formCheck="Form Invalid!!"
    }
  }
}
