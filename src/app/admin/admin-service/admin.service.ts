import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from "../../models/user";
import * as admin from 'firebase-admin';
import { AuthService } from '../../core/auth-service/auth.service';



@Injectable()
export class AdminService {
  currentUserSubject : BehaviorSubject<User> = new BehaviorSubject<User>(null);
  usersSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  currentUser : Observable<User> = this.currentUserSubject.asObservable();
  users$: Observable<any> = this.usersSubject.asObservable();

  constructor(private afs: AngularFirestore, private authService: AuthService) {

    authService.user$.subscribe(data => {
      this.currentUserSubject.next(data);
      console.log("currentUser: ", this.currentUser);
    });

    afs.collection('users').valueChanges().subscribe(data => this.usersSubject.next(data));
   }

   getUsers() : Observable<any>  {
     return this.users$;
   }

  addUser(user: any): void {
    let users = this.usersSubject.getValue();
    users.push(user);
    this.usersSubject.next(users);
  }

  removeUser(user: any) : void {
    // let users = this.usersSubject.getValue();
    // for (let i = 0; i < users.length; i++) {
    //   if (users[i] == user) {
    //     users.splice(i, 1);
    //     this.usersSubject.next(users);
    //   }
    this.afs.collection('users').doc(user.uid).delete()
      .then((data) => {
        console.log(data);
      });
  };





}
