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

    /*(function(d, m){
      var kommunicateSettings = {"appId":"38bed47d92a2bf6b3f8035ff21fbd702f","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://api.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});*/
    (function(d, m){
      var kommunicateSettings = 
          {"appId":"e1eb8ace20142fa669459a3f5bf5603","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
  })(document, (window as any).kommunicate || {});
    
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
