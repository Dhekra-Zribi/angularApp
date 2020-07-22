import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string;
  id:number;
  constructor(private router: Router, private _service: RegistrationService,
    private tokenStorage: TokenStorageService,
    public authService : AuthService, private service : UserService) { }

  ngOnInit(): void {

    this.userName= this.tokenStorage.getUser().userName;
    this.id= this.tokenStorage.getUser().id;

    this.service.getUser(this.id).subscribe(data => {

      this.userName= data.userName;
    }, error => console.log(error));

  }

  logout() {  
    console.log('logout');  
    this._service.logout();  
    this.router.navigate(['/login']);  
  }  
}
