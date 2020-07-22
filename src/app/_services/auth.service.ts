import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role: string[] = [];
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) { }

   login(user){
     console.log(user);
    return this.http.post<any>(AUTH_API + 'signin', user)
     }

   public handleError(error:HttpErrorResponse){
  
    return throwError(error);
   }
   


  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      userName: user.userName,
      emailId: user.emailId,
      mobile: user.mobile,
      phone:user.phone,
      password: user.password
    }, httpOptions);
  }

  addUser(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      userName: user.userName,
      emailId: user.emailId,
      mobile: user.mobile,
      phone:user.phone,
      password: user.password,
      roles : user.roles
    }, httpOptions);
  }

  isAdmin():boolean{
    this.role[0]= this.tokenStorage.getUser().roles;
    if(this.role[0]=="Administrator"){
      return true;
    }
    else{
      return false;
    }
  }
}