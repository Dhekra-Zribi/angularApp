import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /*login(credentials) {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions). 
    pipe 
    (
     catchError(this.handleError)
    );
  }*/
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
      password: user.password
    }, httpOptions);
  }
}