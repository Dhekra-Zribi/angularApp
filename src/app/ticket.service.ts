import { Injectable } from '@angular/core';
import { Ticket } from './ticket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from './commentaire';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  ticket : Ticket;
  list : Ticket[];
  listcoment : Commentaire[];
  formData  : Ticket;
  dataFromService;
  forum : Ticket;
  constructor(private _http : HttpClient, private http: HttpClient) { }

  getPriorities():Observable<any> {
    return this._http.get("http://localhost:8080/api/auth/getpriorities");
  }

  refreshList(){
    this._http.get("http://localhost:8080/api/auth/alltickets")
    .toPromise().then(res => this.list = res as Ticket[]);
  }

  ticketByCreator(creator : string){
    this._http.get("http://localhost:8080/api/auth/ticketcreator?creator="+creator)
    .toPromise().then(res => this.list = res as Ticket[]);
  }


  addTicket(ticket): Observable<any> {
    return this.http.post("http://localhost:8080/api/auth/sendticket", {
      subject: ticket.subject,
      content : ticket.content,
      created_at : ticket.created_at,
      updated_at: ticket.updated_at,
      completed_at: ticket.completed_at,
      users :ticket.users,
      priorities :ticket.priorities,
      creator : ticket.creator});
  }

  getTicket(id: string): Observable<any> {
    return this.http.get("http://localhost:8080/api/auth/ticket?id="+id);
  }

  updateTicket(id: string, ticket): Observable<Object>{
    return this.http.put<any>("http://localhost:8080/api/auth/updateticket?id="+id, ticket);
   }
   addComment(c): Observable<Object>{
    return this.http.post<any>("http://localhost:8080/api/auth/comment", {
      comment: c.comment,
      user : c.user,
      ticket : c.ticket,
      creationDate: c.creationDate});
      
   }

   commentByCreator(ticket : string){
    this._http.get("http://localhost:8080/api/auth/commentuser?ticket="+ticket)
    .toPromise().then(res => this.listcoment = res as Commentaire[]);
  }

  deletecomment(comment):Observable<any>{
    return this._http.delete<any>("http://localhost:8080/api/auth/deletecomment",comment)
  }

   completedTicket(id: string, ticket): Observable<Object>{
    return this.http.put<any>("http://localhost:8080/api/auth/completedticket?id="+id, ticket);
   }

   public deleteTicket(id : string):Observable<any>{
    return this.http.delete<any>("http://localhost:8080/api/auth/Ticketdelete?id="+id)
  }

}
