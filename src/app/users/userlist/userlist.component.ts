import { Component, OnInit,Input } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user';
import { UserComponent } from '../user/user.component';
import { UsersComponent } from '../users.component';
import { Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  @Input() 
  p :number = 1;
  userComp : UserComponent;
  public user : User;
  constructor(public service: UserService, public u : UsersComponent,private _route : Router, public fb: FormBuilder,
    private dialog:MatDialog) {   }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(user: User) {
    this.service.user = Object.assign({}, user);
  }

  onDelete(id: number) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          this.service.deleteUser(id).subscribe(res => {
            this.service.refreshList();
          });
          window.location.reload();
          console.log('Clicked Yes, File deleted!');
  
        } else if (result.isDismissed) {
  
          console.log('Clicked No, File is safe!');
  
          
        }
      })
  
}

  selectUser(item :User){
  
    this.service.form = this.fb.group(Object.assign({},item));
    //this._route.navigate(['/users']);
  }

  AddData(index,Id){ 
    this.service.isOk=true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={index,Id};
    this.dialog.open(UserComponent, dialogConfig).afterClosed().subscribe();

  }

  update(user){
    this.service.isOk=false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={user};
    this.service.dataFromService = user.id;

    console.log("id1",this.service.dataFromService)

    this.dialog.open(UserComponent, dialogConfig).afterClosed().subscribe();

  }

  

}
