import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  currentUser: User = null;
  collapsed = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  logout() {
    this.authService.logout();
    this.collapsed = true;
    this.router.navigate(['']);
  }
}
