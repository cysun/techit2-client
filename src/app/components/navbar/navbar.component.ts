import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

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

  navigate(path: string) {
    this.collapsed = true;
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
    this.collapsed = true;
    this.router.navigate(['']);
  }
}
