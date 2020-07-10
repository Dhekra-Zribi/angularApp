import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user= new User();
  msg=''
  
  @ViewChild('role') role: ElementRef;

  constructor(public service: UserService
    , private _route : Router) { }

  ngOnInit() {
    this.resetForm();
  }

  addUser(){

    this.user.role = this.role.nativeElement.value;
    this.service.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received");
       // this.msg="Registration successful";
      },
      error => {
        console.log("exception occured");
       // this.msg=error.error;
        this.msg="Email is already exist!";
        ;
      }
    )
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      userName: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      role:''
    }
  }


/*  onSubmit(form: NgForm) {
    if (form.value.id == null)
      this.insertRecord(form);
    //else
     // this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postUser(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putUser(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
    });
  }*/

}
