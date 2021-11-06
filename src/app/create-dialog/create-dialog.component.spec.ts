import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { RouterTestingModule } from '@angular/router/testing';
import { UserserviceService } from '../userservice.service';

import { CreateDialogComponent } from './create-dialog.component';

describe('CreateDialogComponent', () => {
  let component: CreateDialogComponent;
  let fixture: ComponentFixture<CreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDialogComponent ],
      imports:[MatDialogModule,FormsModule,ReactiveFormsModule,RouterTestingModule],
      providers:[HttpHandler,HttpClient,UserserviceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
