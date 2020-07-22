import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { ProfilComponent } from '../profil.component';

@Component({
  selector: 'app-pwd',
  templateUrl: './pwd.component.html',
  styleUrls: ['./pwd.component.css']
})
export class PwdComponent implements OnInit {

  password:string;
  id : number;
  user= new User();

  constructor(public dialogRef:MatDialogRef<PwdComponent>
    , private tokenStorage: TokenStorageService, private service : UserService) { }

  ngOnInit(): void {
    this.id= this.tokenStorage.getUser().id;

    this.service.getUser(this.id).subscribe(data => {
      this.user = data;
      
    }, error => console.log(error));
  }
  

}
