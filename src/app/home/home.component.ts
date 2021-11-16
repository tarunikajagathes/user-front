import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { RoleComponent } from '../role/role.component';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  details:any;
  value:any;
  role:any;
  constructor(private dialog:MatDialog,private service:UserserviceService) { this.data()}
  ngOnInit(){
    this.data();
  }

 public Logout(){
    sessionStorage.removeItem('currentUser');
  }

  public create(){
    this.service.access().subscribe((res)=>{
      this.value=res;
      if(this.value.data1!="granted")
      alert("Forbidden");
      else{
        this.dialog.open(CreateDialogComponent,{height:'455px',width:'455px',disableClose:true}).afterClosed().subscribe(()=>{
          this.data();
        });
      }
    },err=>{
      console.log(err);
    });
    
  }

  public createRole(){
    this.service.access().subscribe((res)=>{
      this.value=res;
      if(this.value.data1!="granted")
      alert("Forbidden");
      else{
        this.dialog.open(RoleComponent,{height:'455px',width:'455px',disableClose:true}).afterClosed().subscribe(()=>{
          this.data();
        });
      }
    },err=>{
      console.log(err);
    }); 
  }


  private data() {
    this.service.data().subscribe(res => {
      this.details = res;
    })
  }

  public edit(name:any){
    this.service.access().subscribe((res)=>{
      this.value=res;
      if(this.value.data1!="granted")
      alert("Forbidden");
      else{
        this.dialog.open(EditDialogComponent,{height:'455px',width:'455px',disableClose:true,data:{data:name}}).afterClosed().subscribe(()=>{
          this.data();
        })
      }
    },err=>{
      console.log(err);
    })
  }
  public delete(name:any){
    this.service.access().subscribe((res)=>{
      this.value=res;
      if(this.value.data1!="granted")
      alert("Forbidden");
      else{
        this.service.delete(name).subscribe();
    this.data();
      }
    },err=>{
      console.log(err);
    });

  }
}
