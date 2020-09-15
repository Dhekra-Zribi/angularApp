import { Component, OnInit } from '@angular/core';
import { Sms } from '../sms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TranscieverService } from '../transciever.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sms-recu',
  templateUrl: './sms-recu.component.html',
  styleUrls: ['./sms-recu.component.css']
})
export class SmsRecuComponent implements OnInit {

  searchText;
  p :number = 1;
  constructor(public service: TranscieverService,
    private route : Router,
    public authService : AuthService,
   // ,private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.service.refreshListRecu();
  }

  populateForm(smsRecu: Sms) {
    this.service.smsRecu = Object.assign({}, smsRecu);
  }

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

        this.service.deleteSmsRecu(id).subscribe();
        window.location.reload();
        console.log('Clicked Yes, File deleted!');

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
  }

  deleteRecu(){

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete All records!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {

        this.service.deleteAllSmsRecu().subscribe();
        window.location.reload();
        console.log('Clicked Yes, File deleted!');

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
    
  }


}
