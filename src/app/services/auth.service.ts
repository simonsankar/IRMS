import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  admin: Observable<firebase.User>;
  adminName:any;

  constructor(private firebaseAuth: AngularFireAuth) { 
    this.admin = firebaseAuth.authState;
    this.admin.subscribe(value => {
      this.adminName = value;
      console.log(this.adminName);
    });
  }

  //Sign up new admin
  signUp(email: string, password: string) {
    this.firebaseAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Admin Added!', value);
    })
    .catch(err => {
      console.log('Error:', err.message);
    });
  }

  //Login Admin
  login(email: string, password: string) {
    this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Successfully logged in!', value);
    })
    .catch(err => {
      console.log('Error:',err.message);
    });
  }

  //Logout Admin
  logout() {
    this.firebaseAuth
    .auth
    .signOut();
  }

}
