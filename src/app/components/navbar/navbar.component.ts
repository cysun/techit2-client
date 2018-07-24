import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  currentUser = null;
  collapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getCurrentUser()
      .subscribe(currentUser => (this.currentUser = currentUser));
  }

  logout() {
    this.authService.logout();
    this.collapsed = true;
  }
}
