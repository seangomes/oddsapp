import { Component, OnInit } from '@angular/core';
import { AdminService } from "../admin-service/admin.service";
import { Observable } from '@firebase/util';
import { User } from '../../models/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private users = [];

  constructor(private adminServie: AdminService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminServie.getUsers().subscribe(data => this.users = data);
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
