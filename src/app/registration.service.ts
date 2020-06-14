import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  userName : string
  constructor(private _http : HttpClient) { }

  public loginUserFromRemote(user : User):Observable<any>{
    this.userName = user.userName;
    localStorage.setItem('isLoggedIn', "true");  
    localStorage.setItem('token', user.emailId);

    return this._http.post<any>("http://localhost:8080/login", user)
  }

  public registerUserFromRemote(user : User):Observable<any> {
    return this._http.post<any>("http://localhost:8080/registerUser", user)
  }

  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    }  

}
