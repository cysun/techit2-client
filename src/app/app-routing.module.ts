import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets/new',
    component: TicketFormComponent,
    canActivate: [AuthGuard]
  },
  { path: 'tickets/:id', component: TicketComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
