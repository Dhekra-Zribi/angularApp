import { Injectable } from '@angular/core';
import { Sms } from './sms';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TranscieverService {

  sms : Sms
  list : Sms[];
  constructor(private _http : HttpClient) { }

  public createSms(sms : Sms):Observable<any>{
    alert('Sms send :)');
    return this._http.post<any>("http://localhost:8080/sms/create", sms)
  }

  public getAllSms():Observable<any>{
    return this._http.get<any>("http://localhost:8080/sms")
  }

  refreshList(){
    this._http.get("http://localhost:8080/sms")
    .toPromise().then(res => this.list = res as Sms[]);
  }

  public deleteAllSms():Observable<any>{
    return this._http.delete<any>("http://localhost:8080/sms/deleteAll")
  }
/////////////////////////////////
  public deleteSms(id : number):Observable<any>{
    return this._http.delete<any>("http://localhost:8080/smsdelete?id="+id)
  }
}
