import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  id : string;
  user : any [];
  myDate = Date.now();
  constructor( private router: Router, public _service: RegistrationService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token'); 
  }

  profil(emailId :  string){
    this._service.profil(localStorage.getItem('token'));
  }
  populateForm(user: User) {
    //this._service.user = Object.assign({}, user);
    this._service.profil(localStorage.getItem('token'));
  }


}
