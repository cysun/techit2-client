import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';
import { Ticket } from '../../models/ticket.model';
import { Update } from '../../models/update.model';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: []
})
export class TicketComponent implements OnInit, OnDestroy {
  ticket: Ticket;
  currentUser: User;
  currentUserSub: Subscription;

  update = new Update();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService,
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
    this.currentUserSub = this.authService
      .getCurrentUser()
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        this.update.technician = {
          id: this.currentUser._id,
          username: this.currentUser.username
        };
      });
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  back() {
    this.location.back();
  }

  open(form, field: string) {
    this.update.details = '';
    const oldValue = this.ticket[field];
    this.modalService
      .open(form)
      .result.then(() => {
        if (this.ticket[field] === oldValue) return;
        this.ticketService
          .update(
            this.ticket._id,
            field,
            this.ticket[field],
            this.update.details
          )
          .subscribe(() => {
            this.update.summary = `Ticket ${field} set to ${
              this.ticket[field]
            }`;
            const newUpdate = new Update();
            newUpdate.summary = this.update.summary;
            if (this.update.details) newUpdate.details = this.update.details;
            newUpdate.technician = this.update.technician;
            this.ticket.updates.push(newUpdate);
          });
      })
      .catch(() => {
        this.ticket[field] = oldValue;
        this.update.details = '';
      });
  }
}
