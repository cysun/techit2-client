import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { ChecklistModule } from 'angular-checklist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketsTableComponent } from './components/tickets-table/tickets-table.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const ROLES = ['ADMIN', 'SUPERVISOR', 'TECHNICIAN'];

const DEPARTMENTS = [
  'Civil Engineering',
  'Computer Science',
  'Electrical and Computer Engineering',
  'Mechanical Engineering',
  'Technology',
  'Other'
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    ProfileComponent,
    TicketsComponent,
    TicketsTableComponent,
    TicketComponent,
    TicketFormComponent,
    UsersComponent,
    UserComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChecklistModule,
    NgbModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwtToken'),
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/login']
      }
    })
  ],
  providers: [
    { provide: 'ROLES', useValue: ROLES },
    { provide: 'DEPARTMENTS', useValue: DEPARTMENTS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
