import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  details:any;
  formCheck="";
  Name:any;
  Date:any;
  Role:any;

  user:FormGroup=new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(/(\b(?:([A-Za-z])(?!\2{2}))+\b)/)]),
    date:new FormControl(null,[Validators.required]),
    role:new FormControl(null,[Validators.required])
  })
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private service:UserserviceService,private dialog:MatDialog,private router:Router) { }
  ngOnInit(){
    this.userData();
  }
  private userData() {
    this.service.userDetails(this.data.data).subscribe(res => {
      this.details = res;
      console.log(this.details[0].Name);
      this.Name=this.details[0].Name;
      this.Date=this.details[0].Date;
      this.Role=this.details[0].Role;
    })
  }

  public close(){
    this.dialog.closeAll();

  }
  public save(){
    if(this.user.value.name!=null||this.user.value.date!=null||this.user.value.role!=null){
      if (this.user.value.name == null) {
        this.user.value.name = this.Name;
      }
      if (this.user.value.date == null) {
        this.user.value.date = this.Date;
      }
      if (this.user.value.role == null) {
        this.user.value.role = this.Role;
      }
      this.service.userUpdate(this.user.value,this.data.data).subscribe(err=>console.log(err));
      this.dialog.closeAll();
      this.router.navigate(['Home']);
    }
    else{
      this.formCheck="Form Invalid!!"
    }
  }

}

