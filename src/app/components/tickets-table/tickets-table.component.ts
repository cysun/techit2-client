import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styles: []
})
export class TicketsTableComponent implements OnInit {
  @Input() tickets: Ticket[];

  constructor() {}

  ngOnInit() {}
}
