import { Component, OnInit, Injectable } from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { Ticket } from 'src/app/ticket';
import { NgForm } from '@angular/forms';
import { CreateticketComponent } from '../createticket/createticket.component';
import { Commentaire } from 'src/app/commentaire';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-detailticket',
  templateUrl: './detailticket.component.html',
  styleUrls: ['./detailticket.component.css']
})
export class DetailticketComponent implements OnInit {

  constructor(public service : TicketService , private tokenStorage: TokenStorageService) { }
  

  creator : string;
  subject : string;
  content : string;
  created_at:string;
  id : string;
  ticket : Ticket;
  commentaire = new Commentaire ();
  f : NgForm;
  user : string;
  
  profil : string;
  ngOnInit(): void {

    this.profil= this.tokenStorage.getUser().userName;
    //this.ticket=this.service.ticket;
    this.ticket = this.tokenStorage.getTicket();
    this.id=this.tokenStorage.getTicket().id;

    this.service.getTicket(this.id).subscribe(data => {

      this.creator= data.creator
    this.subject= data.subject;
    this.content = data.content;
    this.created_at = data.created_at;
    }, error => console.log(error));

    this.service.commentByCreator(this.id);

    console.log(this.profil);
   
    }

    onSubmit() {
      /*this.service.addComment(this.id, this.ticket)
      .subscribe(
        data => console.log(data),
        error => console.log("errur",error));*/
        
        //this.ticket.comment = form.value.comment;
        //this.commentaire.comment = form.value.comment;
        //this.comment();
        
        this.commentaire.user = this.profil;
        this.commentaire.ticket = this.id;
        this.service.addComment(this.commentaire)
      .subscribe(
        data => window.location.reload(),
        error => console.log("errur",error.error.message));
    }

    comment() {
  
      this.service.addComment(this.commentaire)
        .subscribe(
          data => console.log(data),
          error => console.log("erreur",error));
      
    //  
    }

   

}

