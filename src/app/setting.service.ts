import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigSmsc } from './config-smsc';
import { Observable } from 'rxjs';
import { Config } from 'protractor';
import { Role } from './user';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  smsc : ConfigSmsc;
  list : ConfigSmsc[];
  listRole : Role[];
  role : Role;
  formData  : ConfigSmsc;
  dataFromService;
  constructor(private _http: HttpClient) { }

  refreshList(){
    this._http.get("http://localhost:8080/api/auth/smsc")
    .toPromise().then(res => this.list = res as ConfigSmsc[]);
  }

  getSmsc(): Observable<any> {
    return this._http.get("http://localhost:8080/api/auth/smsc");
  }

  bind(smsc : ConfigSmsc): Observable<any> {
    return this._http.post("http://localhost:8080/api/auth/bind", smsc);
  }

  saveSmsc(smsc : ConfigSmsc): Observable<any> {
    return this._http.post("http://localhost:8080/api/auth/savesmsc", smsc);
  }

  getRoles():Observable<any> {
    return this._http.get("http://localhost:8080/api/auth/roles");
    //.toPromise().then(res => this.listRole = res as Role[]);
  }

}
