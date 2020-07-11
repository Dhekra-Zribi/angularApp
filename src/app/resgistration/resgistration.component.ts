import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-resgistration',
  templateUrl: './resgistration.component.html',
  styleUrls: ['./resgistration.component.css']
})
export class ResgistrationComponent implements OnInit {

  user= new User();
  msg=''
  
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private _service : RegistrationService, private _route : Router,
    private authService: AuthService
    ) { }

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




  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
