import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: []
})
export class TicketComponent implements OnInit {
  ticket: Ticket;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        this.router.navigate(['/tickets']);
        return;
      }
      this.ticketService.get(params['id']).subscribe(ticket => {
        this.ticket = ticket;
      });
    });
  }

  back() {
    this.location.back();
  }
}
