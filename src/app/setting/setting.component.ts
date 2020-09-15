import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';
import { Config } from 'protractor';
import { ConfigSmsc } from '../config-smsc';
import { AuthService } from '../_services/auth.service';
import { Role } from '../user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  ipAddress : string;
  systemId: string;
  password : string;
  port : number;
  smsc = new ConfigSmsc();
  smscSaved = new ConfigSmsc();
  alert1 : string;
  alert2 : string;
  isFailed = false;
  isOk = false;
  constructor(private service : SettingService, public authService : AuthService) { }

  ngOnInit(): void {

    this.service.getSmsc().subscribe(
      data => {
        this.ipAddress = data.ipAddress;
        this.systemId = data.systemId;
        this.password = data.password;
        this.port = data.port;
      },
      error => {
        console.log("exception occured");
        }
    )
  }

  bind(){
    this.service.bind(this.smsc).subscribe(
    data => {
        this.isOk = true;
        this.isFailed = false;
        this.alert1="your are connected to SMPPSim.";
        

    },
    error => {
      this.isFailed = true;
      this.isOk = false;
      this.alert2 = error.error.message;
      }
  )
  }

  saveSmsc(){
    if(this.isOk = true){
      this.smscSaved = this.smsc;
      this.service.saveSmsc(this.smscSaved).subscribe(
        data => {
          console.log("saved");
         // alert("Smsc's settings are saved.. ");
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Smsc's settings has been saved.",
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
  
      },
      error => {
        console.log("erreur",error.error.message);
        }
      );
    }
    
  }


}
