import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { CreateticketComponent } from './createticket/createticket.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  searchText;
  @Input()
  p :number = 1;
  creator : string;
  public ticket : Ticket;
  clicked = false;
  constructor(public service : TicketService, private dialog:MatDialog, 
    public authService : AuthService, private tokenStorage: TokenStorageService, private route : Router) { }
    

  ngOnInit(): void {
   // 

   this.creator= this.tokenStorage.getUser().userName;
  
   if (this.authService.isAdmin()) {
    this.service.refreshList();
   }
   else{
    this.service.ticketByCreator(this.creator);
   }
    
  }

  populateForm(ticket: Ticket) {
    this.service.ticket = Object.assign({}, ticket);
    this.tokenStorage.saveTicket(this.service.ticket);
    this.route.navigate(['/detailticket']);

  }

  AddData(index,Id){ 
     
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={index,Id};
    this.dialog.open(CreateticketComponent, dialogConfig).afterClosed().subscribe();

  }

  update(ticket){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={ticket};
    this.service.dataFromService = ticket.id;
    //console.log("id",this.service.dataFromService);
    this.dialog.open(CreateticketComponent, dialogConfig).afterClosed().subscribe();

  }

  completed(ticket_id: string, ticket){

    this.service.completedTicket(ticket_id, ticket).subscribe(res => {
      this.ngOnInit();
    });
  }

  onDelete(ticket_id: string) {
   Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this record!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
  }).then((result) => {

    if (result.isConfirmed) {

      this.service.deleteTicket(ticket_id).subscribe(res => {
        this.ngOnInit();
      });
      window.location.reload();
      console.log('Clicked Yes, File deleted!');

    } else if (result.isDismissed) {

      console.log('Clicked No, File is safe!');

      
    }
  })
  }
}
