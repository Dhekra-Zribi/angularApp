import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  f : FormGroup;
  formData  : User;
  profile : any;
  list : User[];
  user : User;
  form:  FormGroup; 
  dataFromService;
  l: any={}

  constructor(private http : HttpClient) { }

  public registerUserFromRemote(user : User):Observable<any> {
    if (user.password == user.confirmPassword) {
      return this.http.post<any>("http://localhost:8080/api/auth/registerUser", user)
    }
  }

  refreshList(){
    this.http.get("http://localhost:8080/api/auth/users")
    .toPromise().then(res => this.list = res as User[]);
    
  }
  public deleteUser(id : number):Observable<any>{
    return this.http.delete<any>("http://localhost:8080/api/auth/userdelete?id="+id)
  }
  

  updateUser(id: number, user): Observable<Object>{
    //return this.http.put<any>("http://localhost:8080/users?id="+id, user);
    return this.http.put<any>("http://localhost:8080/api/auth/update?id="+id, user);
   }

  putProfileUser(id: number, user): Observable<Object>{
    return this.http.put<any>("http://localhost:8080/api/auth/profile?id="+id, user);
  }


   getUser(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/api/auth/user?id="+id);
  }

  
  
}
