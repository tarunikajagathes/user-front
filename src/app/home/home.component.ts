import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  details:any;
  constructor(private dialog:MatDialog,private service:UserserviceService) { this.data()}
  ngOnInit(){
    this.data();
  }

 public Logout(){
    sessionStorage.removeItem('currentUser');
  }

  public create(){
    this.dialog.open(CreateDialogComponent,{height:'455px',width:'455px',disableClose:true}).afterClosed().subscribe(()=>{
      this.data();
    });
  }


  private data() {
    this.service.data().subscribe(res => {
      this.details = res;
    })
  }

  public edit(name:any){
    this.dialog.open(EditDialogComponent,{height:'455px',width:'455px',disableClose:true,data:{data:name}}).afterClosed().subscribe(()=>{
      this.data();
    })
  }
  public delete(name:any){
    this.service.delete(name).subscribe();
    this.data();

  }
}
