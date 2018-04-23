import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private userSubject : BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user$ : Observable<User> = this.userSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    //check if authed
    this.afAuth.authState.subscribe((userFBAuth) => {
      console.log(userFBAuth);
      if(userFBAuth) {
        //User is authed
        let userCollection = this.afAuth.app.firestore().collection('users');
        console.log(userCollection);
        let user = userCollection.doc(userFBAuth.uid);
        if(user) {
         console.log(user);
        }
      }
    });
   }


  login(email:string, password:string) {
    return this.afAuth.app.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      if(user) {
        this.currentUser(user.uid).subscribe(userData => {
          this.userSubject.next(userData);
        });
      }
    }).catch((err) => {
      if(err.code === "auth/email-already-in-use" || "auth/invalid-email" || "auth/user-disabled" || "auth/user-not-found" || "auth/wrong-password") {
        return err.message;
      }
    });
  }


  register(email: string, password: string, username: string) {
    if (email !== null && password !== null) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {

          if (user !== null) {
            user.updateProfile({ displayName: username })
              .then((data) => {
                //CreateFireStore User
                this.afs.collection('users').doc(user.uid).set({
                  username: username,
                  email: email,
                  password: password,
                  uid: user.uid,
                  isOnline: false
                });
                //routes to home
                this.router.navigate(['/auth/login']);
              });
          }
        })
        .catch((error) => {
          if(error.code === "auth/email-already-in-use" || error.code === "auth/invalid-email" || error.code === "auth/operation-not-allowed" || error.code === "auth/weak-password") {
            console.log("register auth data: " + error);
            return error.message;
          }
        })
    }
  }

   //Signout
   signout(): void {
    this.afAuth.auth.signOut();
    //resetting subject
    this.userSubject.next(null);
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
  }


  // Returns current logged in user data from FIRESTORE
  private currentUser(userId: string): Observable<User> {
    let userDoc = this.afs.collection<User>('users/');
    userDoc.doc(userId).snapshotChanges().map(action => {
      const data = action.payload.data() as User;
      return data;
    }).subscribe((data) => {
      this.userSubject.next(data);
    });
    return this.user$;
  }

}
