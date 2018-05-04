import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../services/admin-service/admin.service";
import { Observable } from '@firebase/util';
import { User } from '../../../shared/models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private users$;

  constructor(private adminServie: AdminService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.adminServie.getUsers();
  }

  deleteUser(user: User) {
    if (user) {
      if(window.confirm('Are you sure that you want to delete this user?')) {
        this.adminServie.removeUser(user);
      }

    }
  }

  confirmDelete() {

  }

}
