import { Component, OnInit,Input } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user';
import { UserComponent } from '../user/user.component';
import { UsersComponent } from '../users.component';
import { Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

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
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteUser(id).subscribe(res => {
        this.service.refreshList();
      });
      window.location.reload();
  }
}

  selectUser(item :User){
  
    this.service.form = this.fb.group(Object.assign({},item));
    //this._route.navigate(['/users']);
  }

  AddData(index,Id){ 
     
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={index,Id};
    this.dialog.open(UserComponent, dialogConfig).afterClosed().subscribe();

  }

  update(user){
    
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
