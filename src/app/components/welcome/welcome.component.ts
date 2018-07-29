import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: ['::ng-deep .alert { margin-bottom: 0; }']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSub: Subscription;

  login = {
    username: '',
    password: ''
  };

  loginFailed = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserSub = this.authService
      .getCurrentUser()
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        if (this.currentUser) this.router.navigate(['tickets']);
      });
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  open(loginForm) {
    this.modalService
      .open(loginForm)
      .result.then(() => {
        // login attempted
        this.authService
          .login(this.login.username, this.login.password)
          .subscribe(
            result => {
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
