import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Ticket } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styles: []
})
export class TicketFormComponent implements OnInit {
  currentUser: User;
  ticket: Ticket;

  constructor(
    @Inject('DEPARTMENTS') public departments: string[],
    private router: Router,
    private authService: AuthService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
      if (this.currentUser) {
        this.ticket = new Ticket();
        this.ticket.setUser(this.currentUser);
      }
    });
  }

  onSubmit() {
    this.ticketService.submit(this.ticket).subscribe(newTicket => {
      this.router.navigate(['tickets', newTicket._id]);
    });
  }
}
