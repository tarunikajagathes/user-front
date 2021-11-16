import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit{

  formCheck="";
  details:any;

  user:FormGroup=new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(/(\b(?:([A-Za-z])(?!\2{2}))+\b)/)]),
    date:new FormControl(null,[Validators.required]),
    role:new FormControl(null,[Validators.required])
  })

  constructor(private dialog:MatDialog, private service:UserserviceService,private router:Router) { }

  ngOnInit(){
    this.list();
  }
  
  public close(){
    this.dialog.closeAll();

  }

  public list(){
    this.service.roleList().subscribe(res=>{
      this.details=res;
    })
  }

  public save(){
    if(this.user.valid){
      this.formCheck="";
    const data = { name: this.user.value.name, date: this.user.value.date, role: this.user.value.role }
    this.service.user(data)
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
