import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from "../../models/user";
import * as admin from 'firebase-admin';



@Injectable()
export class AdminService {

  usersSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  users$: Observable<any> = this.usersSubject.asObservable();

  constructor(private afs: AngularFirestore) {
    this.afs.collection('users').valueChanges().subscribe(data => this.usersSubject.next(data));
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
