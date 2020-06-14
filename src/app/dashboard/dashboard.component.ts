import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id: string;
  constructor(private router: Router, private _service: RegistrationService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token');  

  }



  logout() {  
    console.log('logout');  
    this._service.logout();  
    this.router.navigate(['/login']);  
  }  
}
