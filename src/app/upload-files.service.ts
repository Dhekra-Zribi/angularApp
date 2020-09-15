import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  upload(user : string, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload?user=`+user, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(user : string): Observable<any> {
    return this.http.get(`${this.baseUrl}/files?user=`+user);
  }

 /* ticketByCreator(creator : string){
    this._http.get("http://localhost:8080/api/auth/ticketcreator?creator="+creator)
    .toPromise().then(res => this.list = res as Ticket[]);
  }*/

  show(name : string, user): Observable<any> {
    return this.http.get(`${this.baseUrl}/file?name=`+name+`&user=`+user );
  }

  deleteFile(name : string, user): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete?name=`+name+`&user=`+user );
  }

  
}