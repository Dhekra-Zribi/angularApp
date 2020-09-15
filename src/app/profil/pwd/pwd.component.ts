import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { ProfilComponent } from '../profil.component';
import { FormGroup, NgForm, FormControl, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pwd',
  templateUrl: './pwd.component.html',
  styleUrls: ['./pwd.component.css']
})
export class PwdComponent implements OnInit {

  password:string;
  id : number;
  user= new User();

  form: FormGroup;
  istrue = false;
  isnot = false;
  constructor(public dialogRef:MatDialogRef<PwdComponent>
    , private tokenStorage: TokenStorageService, private service : UserService
    ,private fb: FormBuilder) { }
    

  ngOnInit(): void {
    //console.log("id",this.service.idd,"user", this.service.userr);
    this.user=this.service.userr;
    this.form = new FormGroup({
      password: new FormControl(),
    });
    this.form = this.fb.group({
      password: ['']
    });
    
  }


  verifPwd(){
    
    const pwd = this.form.get('password').value;
    this.service.verifPwd(pwd, this.service.userr.id).subscribe(
      data => 
          {console.log("ok")
          this.istrue=true;
          this.updateProfile();
        }
            
      , error => {
        console.log("no")
        this.isnot = true;}
      );
  }
  
  updateProfile(){
     this.service.updateUser(this.service.idd, this.service.userr)
      .subscribe(
        data => 
            {console.log("updated");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your profil has been updated',
              showConfirmButton: false,
              timer: 2500
            })
            window.location.reload();}
      , error => console.log(error)
      );
      
  }
  

}
