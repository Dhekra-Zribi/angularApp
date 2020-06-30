import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {
  id: string;  
  
  constructor(private router: Router, private _service: RegistrationService) { }  
  
  ngOnInit() {  
    this.id = localStorage.getItem('token');  
    let u = this._service.profil( this.id);
    window.localStorage.setItem('USER', JSON.stringify(u))
    //console.log(this.id);  
  }  
  
  logout() {  
    console.log('logout');  
    this._service.logout();  
    this.router.navigate(['/login']);  
  }  

}
