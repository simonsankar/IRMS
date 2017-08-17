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
  email: string = 'man@gmail.com';
  password: string = 'manman';
  confirmPassword: string = 'manman';

  constructor(
    private flash: FlashMessagesService,
    public auth: AuthService) {
  }

  ngOnInit() {
  }
  
  @ViewChild('signUpModal')
  signUpModal:Modal
  signUp() {
    if(this.signUpValid()) {
      
      let res = this.auth.signUp(this.email,this.password);
      console.log(JSON.stringify(res));
       
      
    }
    else {

    }
  }

  @ViewChild('loginModal')
  loginModal:Modal
  login() {
    let login = this.auth.login(this.email+'',this.password+'');
    this.loginModal.close();
    this.flash.show('Logged in',
      {
        cssClass: 'alert-info',
        timeout: 3500
      }  
    );
  }
  logout() {
    this.flash.show('Logged out',
      {
        cssClass: 'alert-danger',
        timeout: 3500
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
