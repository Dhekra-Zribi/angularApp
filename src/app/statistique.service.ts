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

  count() {
    return this._http.get("http://localhost:8080/nb")
    .pipe(map(result => result));
  }

  refreshList(){
    this._http.get("http://localhost:8080/nb")
    .toPromise().then(res => this.list = res as CountMsgDate[]);
  }

}
