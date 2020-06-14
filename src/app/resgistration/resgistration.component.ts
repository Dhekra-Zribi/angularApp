import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
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
  /*registerForm: FormGroup;
  submitted = false;*/

  constructor(private _service : RegistrationService, private _route : Router
   // , private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    /*this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });*/
  }
  // convenience getter for easy access to form fields
 // get f() { return this.registerForm.controls; }

  /*onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }*/

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
/*
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}*/

}
