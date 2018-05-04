import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap'


@Injectable()
export class AuthService {

  private userSubject : BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private authStateSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public user$ : Observable<User> = this.userSubject.asObservable();
  public authState$ : Observable<boolean> = this.authStateSubject.asObservable();



  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    //check if authed
    this.afAuth.authState.subscribe((userFBAuth) => {
      if(userFBAuth) {
        //User is authed
        let userCollection = this.afs.collection('users');
        userCollection.doc<User>(userFBAuth.uid).valueChanges().subscribe(user => {
          if(user) {
            this.userSubject.next(user);
            this.router.navigate(['/home']);
           }
           else{
            this.userSubject.next(null);
           }
        });
      }
    });
   }

  login(email:string, password:string) {
    return this.afAuth.app.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      if(user) {
        this.currentUser(user.uid).subscribe(userData => {

          let user : User = {
            email: userData.email,
            isOnline: true,
            photoURL: userData.photoURL,
            username: userData.username,
            uid: userData.uid
          }
          //updates online/offline mode on user
          this.afs.collection('users').doc(userData.uid).update({
            isOnline: true
          }).then(() => {
            this.userSubject.next(user);
            this.router.navigate(['/home']);
          });
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
            user.updateProfile({ displayName: username, photoURL: ''})
              .then((data) => {
                //CreateFireStore User
                this.afs.collection('users').doc(user.uid).set({
                  username: username,
                  email: email,
                  password: password,
                  uid: user.uid,
                  isOnline: false,
                  photoURL: ''
                });
                //routes to home
                this.router.navigate(['/login']);
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
    this.afAuth.auth.signOut().then(() => {

      let currentUser = this.userSubject.getValue();
      if(currentUser) {
        this.afs.collection('users').doc(currentUser.uid).update({
          isOnline: false
        }).then(() => {
          this.userSubject.next(null);
          // remove user from local storage to log user out
          //localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        });
      }
    });
    
  }


  // Returns current logged in user data from FIRESTORE
  private currentUser(userId: string): Observable<User> {
    let userDoc = this.afs.collection<User>('users/').doc('jrSMKCeW3ySkuaRZ217oHujEomB2');
    
    userDoc.snapshotChanges().map(action => {
      const data = action.payload.data();
      return data;
    }).subscribe((data) => {
      console.log(data);
      //this.userSubject.next();
    });
    return this.user$;
  }

}
