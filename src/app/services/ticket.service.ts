import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  private _handleError(error: HttpErrorResponse) {
    return throwError(
      error.error instanceof ErrorEvent
        ? error.error.message
        : `${error.status} ${error.error.message}`
    );
  }

  all(): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>('/api/tickets')
      .pipe(catchError(this._handleError));
  }

  submitted(): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>('/api/tickets/submitted')
      .pipe(catchError(this._handleError));
  }

  assigned(): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>('/api/tickets/assigned')
      .pipe(catchError(this._handleError));
  }

  get(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`/api/tickets/${id}`).pipe(
      map(ticket => Ticket.fromObj(ticket)),
      catchError(this._handleError)
    );
  }

  submit(ticket: Ticket): Observable<Ticket> {
    return this.http
      .post<Ticket>('/api/tickets', ticket)
      .pipe(catchError(this._handleError));
  }

  update(
    id: number,
    field: string,
    value: string,
    details: string
  ): Observable<boolean> {
    const body = details ? { details } : {};
    return this.http.put(`/api/tickets/${id}/${field}/${value}`, body).pipe(
      map(() => true),
      catchError(this._handleError)
    );
  }

  assign(id: number, technicianIds: number[]): Observable<boolean> {
    return this.http
      .put(`/api/tickets/${id}/technicians`, { technicians: technicianIds })
      .pipe(
        map(() => true),
        catchError(this._handleError)
      );
  }
}
