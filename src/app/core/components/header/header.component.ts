import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user$;

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  signOut() {
    this.authService.signout();
  }

}
