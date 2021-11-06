import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserserviceService } from '../userservice.service';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,RouterTestingModule],
      declarations: [ LoginComponent ],
      providers:[HttpHandler,HttpClient,UserserviceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', ()=>{
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    
  });
});
