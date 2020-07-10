import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user';
import { UserComponent } from '../user/user.component';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(public service: UserService, public u : UsersComponent) {   }

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
  }
}
}
