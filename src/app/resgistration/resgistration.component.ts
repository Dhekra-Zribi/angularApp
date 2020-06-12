import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-resgistration',
  templateUrl: './resgistration.component.html',
  styleUrls: ['./resgistration.component.css']
})
export class ResgistrationComponent implements OnInit {

  user= new User();
  msg=''
  constructor(private _service : RegistrationService, private _route : Router) { }

  ngOnInit(): void {
  }
  registerUser(){

    this._service.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received");
       // this.msg="Registration successful";
       this._route.navigate(['/login']);
      },
      error => {
        console.log("exception occured");
       // this.msg=error.error;
        this.msg="Email is already exist!";
        ;
      }
    )
  }

}
