import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PwdComponent } from './pwd/pwd.component';

export interface DialogData {
  password: string;
}
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  id : number;
  email : string;
  userName : string;
  mobile:string;
  phone:string;
  user= new User();
  myDate = Date.now();
  constructor( private router: Router, public _service: RegistrationService,
    private tokenStorage: TokenStorageService, private userService :UserService
    ,private dialog:MatDialog,
    private service : UserService) { }

  ngOnInit(): void {
    
    this.id= this.tokenStorage.getUser().id;

    this.service.getUser(this.id).subscribe(data => {
      this.user = data;
      this.userName= data.userName;
      this.email= data.emailId;
      this.mobile=data.mobile;
      this.phone=data.phone;
      
    }, error => console.log(error));
    
     /*this.userName= this.tokenStorage.getUser().userName;
      this.email= this.tokenStorage.getUser().email;
      this.mobile=this.tokenStorage.getUser().mobile;
      this.phone=this.tokenStorage.getUser().phone;*/
  }

  profil(emailId :  string){
    this._service.profil(localStorage.getItem('token'));
  }
  populateForm(user: User) {
    //this._service.user = Object.assign({}, user);
    this._service.profil(localStorage.getItem('token'));
  }

  updateProfile(){
      this.service.idd = this.id;
      this.service.userr = this.user;
      this.open();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(Pwd, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }

  open(){  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="25%";
    //dialogConfig.data={index,Id};
    this.dialog.open(PwdComponent, dialogConfig).afterClosed().subscribe();

  }

  


}

export class Pwd {

  constructor(
    public dialogRef: MatDialogRef<Pwd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
