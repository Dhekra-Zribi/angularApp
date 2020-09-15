import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { CountMsgDate } from './count-msg-date.model';
@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  list : CountMsgDate[];
  constructor(private _http: HttpClient) { }


  statistisque():Observable<number>{
    return this._http.get<number>("http://localhost:8080/count")
    .pipe(map(rs => rs));
  }

  statistisque2():Observable<number>{
    return this._http.get<number>("http://localhost:8080/count2")
    .pipe(map(rs => rs));
  }

  statistisque3():Observable<number>{
    return this._http.get<number>("http://localhost:8080/count3")
    .pipe(map(rs => rs));
  }

  count() {
    return this._http.get("http://localhost:8080/nb")
    .pipe(map(result => result));
  }

  count2() {
    return this._http.get("http://localhost:8080/api/auth/nb2")
    .pipe(map(result => result));
  }

  refreshList(){
    this._http.get("http://localhost:8080/nb")
    .toPromise().then(res => this.list = res as CountMsgDate[]);
  }

}
