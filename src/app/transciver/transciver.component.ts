import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Sms } from '../sms';
import { TranscieverService } from '../transciever.service';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-transciver',
  templateUrl: './transciver.component.html',
  styleUrls: ['./transciver.component.css']
})
export class TransciverComponent implements OnInit {

  sms= new Sms();
  msg : string;

  displayedColumns: string[] = ['shortMessage', 'sourceAddr', 'destAddr'];
  data: Sms[] = [];
  isLoadingResults = true;

  constructor(private _service : TranscieverService, private _route : Router
    , public authService : AuthService
    //,private sendSmsform : NgForm
    ) { }

  ngOnInit(): void {
    this._service.getAllSms().subscribe((res : any) =>{
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err =>{
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  sendSms(){
  this._service.createSms(this.sms).subscribe(
    data => {
      //alert('Sms send :)');
      console.log("Message send");
     //this._route.navigate(['/sms']);
     //this.sendSmsform.reset();
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

  deleteSmsById(id : number){
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
