import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  admin: Observable<firebase.User>;
  adminName:any;
  loggedIn: boolean = false;

  constructor(private firebaseAuth: AngularFireAuth) { 
    this.admin = firebaseAuth.authState;
    this.admin.subscribe(value => {
      if(value) {
        this.loggedIn = true;
        this.adminName = value;
        console.log('Current User:',this.adminName);
      } else {
        this.loggedIn = false;
        console.log('No user logged in');
      }
    });
  }

  //Sign up new admin
  signUp(email: string, password: string) {
    return this.firebaseAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Admin Added!', value);
      this.loggedIn = true;
      return true;
    })
    .catch(err => {
      console.log('Error:', err.message);
      this.loggedIn = false;
      return err;
    });
  }

  //Login Admin
  login(email: string, password: string) {
    return this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Successfully logged in!', value);
      this.loggedIn = true;
      return true
    })
    .catch(err => {
      console.log('Error:',err.message);
      this.loggedIn = false;
      return err;
    });
  }

  //Logout Admin
  logout() {
    this.firebaseAuth
    .auth
    .signOut();

    this.loggedIn = false
  }

  isLoggedIn() {
    return this.loggedIn;
  }



}
