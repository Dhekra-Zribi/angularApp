import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Sms } from '../sms';
import { TranscieverService } from '../transciever.service';
@Component({
  selector: 'app-transciver',
  templateUrl: './transciver.component.html',
  styleUrls: ['./transciver.component.css']
})
export class TransciverComponent implements OnInit {

  sms= new Sms();
  constructor(private _service : TranscieverService, private _route : Router) { }

  ngOnInit(): void {
  }

  sendSms(){
  this._service.createSms(this.sms).subscribe(
    data => {
      console.log("Message send");
     //this._route.navigate(['/sms']);
    },
    error => {
      console.log("exception occured");
      ;
      }
    )
  }

  getAllSms(){
    this._service.getAllSms().subscribe(
      data => {
        console.log("success");
      },
      error => {
        console.log("exception occured");
        ;
        }
      )
  }

  deleteSmsById(id : string){
    this._service.deleteSms(id).subscribe(
      data => {
        console.log("message deleted");
       this._route.navigate(['/sms']);
      },
      error => {
        console.log("exception occured");
        ;
        }
      )
  }

  deleteAllSms(){
    this._service.deleteAllSms().subscribe(
      data => {
        console.log("All messages are deleted");
       this._route.navigate(['/sms']);
      },
      error => {
        console.log("exception occured");
        ;
        }
    )
  }

}
