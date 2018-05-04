import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    uid: "",
    username: "",
    email: "",
    password: "",
    isOnline: false
  }

  private resMessage : string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    if(this.user.email !== '' && this.user.password !== '' && this.user.username !== '') {
      this.authService.register(this.user.email, this.user.password, this.user.username)
        .then((data) => {
          if(data !== '') {
            this.resMessage = data;
          }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

}
