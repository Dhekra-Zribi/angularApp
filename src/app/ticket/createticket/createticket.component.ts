import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ticket } from 'src/app/ticket';
import { NgForm } from '@angular/forms';
import { TicketService } from 'src/app/ticket.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/_services/auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.component.html',
  styleUrls: ['./createticket.component.css']
})
export class CreateticketComponent implements OnInit {

  msg : string;

  ticket = new Ticket();
  errorMessage = '';
  priority: string[] = [];
  id1 : number;
  userName : string;
  user= new User();
  idUser:string[] = [];
  id : string;
  priorityInfos: Observable<any>;
  @ViewChild('priorities') priorities: ElementRef;
  constructor(public service : TicketService,
    private dialogRef:MatDialogRef<CreateticketComponent>, 
    private tokenStorage: TokenStorageService, private serviceUser : UserService) { }

  ngOnInit(): void {

    this.priorityInfos = this.service.getPriorities();
    this.id = this.service.dataFromService;
    if (this.id==null) {
      this.resetForm();
      console.log("reset",this.id);
    }
    else{
      console.log(this.id);
       this.service.getTicket(this.id)
      .subscribe(data => {
        console.log(data)
        this.ticket = data;
      }, error => console.log(error));
      
    }
    
    this.id1= this.tokenStorage.getUser().id;
    this.serviceUser.getUser(this.id1).subscribe(data => {
      this.user = data;
      this.userName= data.userName;
      
    }, error => console.log(error));

    
  }


  add(){
    
    this.priority[0] = this.priorities.nativeElement.value;
    this.ticket.priorities[0] = this.priority[0];

    this.ticket.creator = this.user.userName;
    //this.ticket.users[0]= this.user.id.toString();
    this.service.addTicket(this.ticket).subscribe(
      data => {
        console.log(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your support ticket has been send to the administrateur.',
          showConfirmButton: false,
          timer: 3500
        })
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id : '',
      subject: '',
      content : '',
      created_at : '',
      updated_at: '',
      completed_at: '',
      priorities :null,
      creator : ''

    }
  }
  


  onSubmit(form: NgForm) {
    if (form.value.id == null){
      form.value.user_id = this.user.id;
      console.log(form.value.user_id)
      this.add();
    }
    else{
       this.update();
       this.resetForm();
    }
     
  }

  close(){
    this.dialogRef.close();
    window.location.reload();
    
  }

  update() {
    
    this.priority[0] = this.priorities.nativeElement.value;
    this.ticket.priorities[0] = this.priority[0];
    this.service.updateTicket(this.id, this.ticket)
      .subscribe(
        data => {console.log(data)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your support ticket has been updated.',
            showConfirmButton: false,
            timer: 1500
          })},
        error => console.log(error));
    
    window.location.reload();
  }


}
