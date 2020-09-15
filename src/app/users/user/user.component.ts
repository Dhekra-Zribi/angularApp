import { Component, OnInit, ElementRef,EventEmitter, ViewChild ,Output} from '@angular/core';
import { UserService } from 'src/app/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Role } from '../../user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserlistComponent } from '../userlist/userlist.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingService } from 'src/app/setting.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 /* @Output() alerteCanicule = new EventEmitter<any>();
  onTemperatureRises() {
    this.alerteCanicule.emit();  // Déclenche l'output
    console.log("ouiii")
  }*/
  user= new User();
  msg=''
  errorMessage = '';
  role: string[] = [];
  roless: string[] = [];
  roleInfos: Observable<any>;
  id: number;
  isSignUpFailed = false;
  @ViewChild('roles') roles: ElementRef;

  constructor(public service: UserService
    , private _route : Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialogRef:MatDialogRef<UserComponent>,
    public roleService : SettingService
    ) { }


  ngOnInit() {
    //this.resetForm();

    
    this.roleInfos = this.roleService.getRoles();

    this.id = this.service.dataFromService;
    if (this.id==null) {
      this.resetForm();
      console.log("reset",this.id);
    }
    else{
      console.log(this.id);
       this.service.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
      
    }
  }

  add(){
    this.roless[0] = this.roles.nativeElement.value;
    this.user.roles[0] = this.roless[0];
    this.authService.addUser(this.user).subscribe(
      data => {
        console.log(data);
        this.isSignUpFailed = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User has been saved',
          showConfirmButton: false,
          timer: 2000
        })
        window.location.reload();
      },
      err => {
        this.isSignUpFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  close(){
    this.dialogRef.close();
    window.location.reload();
    
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      userName: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      roles:null,
      mobile:'',
      phone:''
    }
  }
  


  onSubmit(form: NgForm) {
    if (form.value.id == null){
      this.add();
    }
    else{
       this.update();
      // this.resetForm();
    }
     
  }


  update() {
    
    this.role[0] = this.roles.nativeElement.value;
    this.user.roles[0] = this.role[0];
    this.service.upd(this.id, this.user)
      .subscribe(
        data => 
        {console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User has been updated',
            showConfirmButton: false,
            timer: 2000
          })
          window.location.reload();
        
        },
        error => console.log(error));
    
   // window.location.reload();
  }
}
