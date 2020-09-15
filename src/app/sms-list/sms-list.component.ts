import { Component, OnInit } from '@angular/core';
import { Sms } from '../sms';
import { TranscieverService } from '../transciever.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TransciverComponent } from '../transciver/transciver.component';
import { CompagneComponent } from '../compagne/compagne.component';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import Swal from 'sweetalert2';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.css']
})
export class SmsListComponent implements OnInit {

  searchText;
  p :number = 1;
  constructor(public service: TranscieverService,
    private route : Router,
    public authService : AuthService,
    private dialog:MatDialog,
    private confirmationDialogService: ConfirmationDialogService
   // ,private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(sms: Sms) {
    this.service.sms = Object.assign({}, sms);
  }

/*  onDelete(id: number) { 
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteSms(id).subscribe();
      window.location.reload();
    }
  }*/

  // Custom Buttons
  onDelete(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {

        this.service.deleteSms(id).subscribe();
        window.location.reload();
        console.log('Clicked Yes, File deleted!');

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })

  }

  deleteAll(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete ALL records!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {

        this.service.deleteAllSms().subscribe();
        window.location.reload();
        console.log('Clicked Yes, File deleted!');

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
  }
  AddData(index,Id){ 
     
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={index,Id};
   // this.dialog.open(TransciverComponent, dialogConfig).afterClosed().subscribe();
   this.dialog.open(CompagneComponent, dialogConfig).afterClosed().subscribe();

  }

  SendData(index,Id){ 
     
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={index,Id};
    this.dialog.open(TransciverComponent, dialogConfig).afterClosed().subscribe();

  }

}
