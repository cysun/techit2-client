import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: ['::ng-deep .alert { margin-bottom: 0; }']
})
export class WelcomeComponent implements OnInit {
  login = {
    username: '',
    password: ''
  };

  loginFailed = false;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  open(loginForm) {
    this.modalService
      .open(loginForm)
      .result.then(() => {
        // login attempted
        this.authService
          .login(this.login.username, this.login.password)
          .subscribe(
            result => {
              console.log('login successful');
              this.loginFailed = false;
            },
            err => {
              this.loginFailed = true;
            }
          );
      })
      .catch(() => {
        // login form dismissed
        this.loginFailed = false;
      });
  }
}
