import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ModalModule,Modal } from 'ngx-modal';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  brandImage:string = '../../../assets/images/brand.png';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error:string;

  constructor(
    public flash: FlashMessagesService,
    public auth: AuthService) {
  }

  ngOnInit() {
  }
  
  @ViewChild('signUpModal')
  signUpModal:Modal
  signUp() {
    if(this.signUpValid()) {
      this.auth.signUp(this.email,this.password)
      .then(value => {
        console.log('SignUp response',value);
        if(value == true) {
          this.error = '';
          this.signUpModal.close();
          this.flash.show('Signed Up!',
            {
              cssClass:'alert-success',
              timeout:2900
            }
          );
        } else {
          this.error = value.message
        }
      })
      .catch(error => {
        console.log(error);
      });
      
    }
  }

  @ViewChild('loginModal')
  loginModal:Modal
  login() {
    this.auth.login(this.email+'',this.password+'')
    .then(value => {
      if(value == true) {
        this.error = '';
        this.loginModal.close();
        this.flash.show('Logged in.',
          {
            cssClass: 'alert-info',
            timeout: 2900
          }
        );
      } else {
        this.error = value.message;
      }
    })
    .catch(err => {
      console.log(err);
    });
    
  }
  logout() {
    this.flash.show('Logged out',
      {
        cssClass: 'alert-danger',
        timeout: 3100
      }  
    );
    return this.auth.logout();
  }

  signUpValid() {
    if(this.password === this.confirmPassword) {
      if(this.email)
        return 1;
    }
    return 0;
  }
}
