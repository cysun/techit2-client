import { NgModule } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
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

export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}

// We need to get APP_BASE_HREF so we can inject it into the services.
// See https://stackoverflow.com/questions/39287444/angular2-how-to-get-app-base-href-programatically
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

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
        tokenGetter: tokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    },
    { provide: 'ROLES', useValue: ROLES },
    { provide: 'DEPARTMENTS', useValue: DEPARTMENTS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
