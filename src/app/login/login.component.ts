import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user= new User();
  msg=''
  loginForm: FormGroup;  
  message: string;  
  returnUrl: string; 

  constructor(private _service : RegistrationService, 
      private _route : Router) { }

  ngOnInit(): void {
    /*this.loginForm = this.formBuilder.group({  
      emailId: ['', Validators.required],  
      password: ['', Validators.required]  
   });  */
  this.returnUrl = '/loginsuccess';  
  this._service.logout();
  }

  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received");
        //localStorage.setItem('isLoggedIn', "true");  
        //localStorage.setItem('token', this.user.emailId.toString());
        this._route.navigate([this.returnUrl]);
      },
      error => {
        console.log("exception occured");
        this.msg="Bad credentials, please enter valid email and password";
      }
    )
  }

  gotoregistration(){
    this._route.navigate(['/registration']);
  }

}
