import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData  : User;
  list : User[];
  user : User;

  constructor(private http : HttpClient) { }

  public registerUserFromRemote(user : User):Observable<any> {
    if (user.password == user.confirmPassword) {
      return this.http.post<any>("http://localhost:8080/registerUser", user)
    }
  }
  
 /* postUser(formData : User){
   return this.http.post("http://localhost:8080/registerUser",formData);
    
  }*/

  refreshList(){
    this.http.get("http://localhost:8080/users")
    .toPromise().then(res => this.list = res as User[]);
  }
  public deleteUser(id : number):Observable<any>{
    return this.http.delete<any>("http://localhost:8080/userdelete?id="+id)
  }

 /* putUser(formData : User){
    return this.http.put("url"+formData.id,formData);
     
   }

   deleteUser(id : number){
    return this.http.delete("url"+id);
   }*/
}
