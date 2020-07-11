import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
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



  public form: any = {};
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];



  constructor(private _service : RegistrationService, 
      private _route : Router,
      private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  //this.returnUrl = '/loginsuccess';  
  //this._service.logout();

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received");
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
