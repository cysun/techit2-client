import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';
import { Ticket } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styles: []
})
export class TicketsComponent implements OnInit {
  currentUser: User = null;

  ticketsAll: Ticket[] = [];
  ticketsSubmitted: Ticket[] = [];
  ticketsAssigned: Ticket[] = [];

  constructor(
    private authService: AuthService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
      if (currentUser == null) return;

      this.ticketService.getSubmittedTickets().subscribe(tickets => {
        this.ticketsSubmitted = tickets;
      });
      if (this.currentUser.isTechnician()) {
        this.ticketService.getAssignedTickets().subscribe(tickets => {
          this.ticketsAssigned = tickets;
        });
      }
      if (!this.currentUser.isRegular()) {
        this.ticketService.getTickets().subscribe(tickets => {
          this.ticketsAll = tickets;
        });
      }
    });
  }
}
