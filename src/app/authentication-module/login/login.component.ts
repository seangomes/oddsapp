import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../core/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    uid: "",
    username: "",
    email: "",
    password: "",
    isOnline: false
  }

  private resMessage : string;

  constructor(private authService:AuthService) { }

  ngOnInit() {

  }

  login() {
    console.log(this.user);
    this.authService.login(this.user.email, this.user.password).then((data) => {
      this.resMessage = data;
    });
  }

}
