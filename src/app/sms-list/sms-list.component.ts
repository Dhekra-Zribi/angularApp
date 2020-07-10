import { Component, OnInit } from '@angular/core';
import { Sms } from '../sms';
import { TranscieverService } from '../transciever.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.css']
})
export class SmsListComponent implements OnInit {

  searchText;
  constructor(public service: TranscieverService,
    private route : Router
   // ,private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(sms: Sms) {
    this.service.sms = Object.assign({}, sms);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteSms(id).subscribe(res => {
        this.service.refreshList();
        
        //this.toastr.warning('Deleted successfully');
      });
/*

      this.service.deleteSms(id).subscribe((data)=>{
        this.route.navigate(['/smslist']).then(() => {
          window.location.reload();
        });
    })*/
  }
}

}
