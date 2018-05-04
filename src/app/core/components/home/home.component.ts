import { Component, OnInit } from '@angular/core';

import { User } from '../../../shared/models/user';
import { AdminService } from '../../../admin/services/admin-service/admin.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  users : Observable<User[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.users = this.adminService.getUsers();
  }

}
