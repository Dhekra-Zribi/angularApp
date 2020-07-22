import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  list : User[];
  user : User;
  userName : string
  constructor(private _http : HttpClient,
    private tokenStorage : TokenStorageService) { }

  public loginUserFromRemote(user : User):Observable<any>{
    this.userName = user.userName;
    localStorage.setItem('isLoggedIn', "true");  
    localStorage.setItem('token', user.emailId);
    //let u = this.profil( localStorage.getItem('token'));
    //window.localStorage.setItem('USER', JSON.stringify(u))

    return this._http.post<any>("http://localhost:8080/api/auth/login", user)
  }

  public registerUserFromRemote(user : User):Observable<any> {
    if (user.password == user.confirmPassword) {
      return this._http.post<any>("http://localhost:8080/api/auth/registerUser", user)
    }
  }

  logout() :void {    
    this.tokenStorage.signOut();  
    }  

  profil(emailId : string) {    
    //return 
    this._http.get("http://localhost:8080/api/auth/profil?emailId="+ emailId)  ;
    //.toPromise().then(res => this.list = res as User[]);
    }  

}
