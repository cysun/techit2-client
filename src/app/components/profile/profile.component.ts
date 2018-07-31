import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;
  editable = false;

  constructor(
    @Inject('DEPARTMENTS') public departments: string[],
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      if (currentUser) this.user = User.fromObj(currentUser);
    });
  }

  onSubmit() {
    this.authService.update(this.user).subscribe(() => {
      this.editable = false;
    });
  }
}
