import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }

  public checkUser(email: string, password: string) {
    return this.http.post(`${environment.baseUrl}/login`, { email: email, password: password })
  }

  public sign(body: any) {
    return this.http.post(`${environment.baseUrl}/signin`, body)
  }

  public user(body: any) {
    return this.http.post(`${environment.baseUrl}/user`, body)
  }

  public emailCheckUnique(email: any) {
    return this.http.get(`${environment.baseUrl}/email/${email}`);
  }
  public data(){
    return this.http.get(`${environment.baseUrl}/user`);
  }

  public delete(name:any){
    return this.http.delete(`${environment.baseUrl}/user/${name}`);
  }

  public userDetails(name:any){
    return this.http.get(`${environment.baseUrl}/user/data/${name}`);
  }

  public userUpdate(value:any,name:any){
    return this.http.put(`${environment.baseUrl}/user/update`,{value:value,name:name});
  }
  public access(){
    return this.http.get(`${environment.baseUrl}/user/access`);
  }
}
