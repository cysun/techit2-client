import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private http: HttpClient
  ) {}

  private _handleError(error: HttpErrorResponse) {
    return throwError(
      error.error instanceof ErrorEvent
        ? error.error.message
        : `${error.status} ${error.error.message}`
    );
  }

  createUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.baseHref}api/users`, user)
      .pipe(catchError(this._handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseHref}api/users`).pipe(
      map(users => {
        return users.map(user => User.fromObj(user));
      }),
      catchError(this._handleError)
    );
  }

  getTechnicians(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseHref}api/users/technicians`).pipe(
      map(technicians => {
        return technicians.map(technician => User.fromObj(technician));
      }),
      catchError(this._handleError)
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseHref}api/users/${id}`).pipe(
      map(user => User.fromObj(user)),
      catchError(this._handleError)
    );
  }

  updateUser(user: User): Observable<boolean> {
    return this.http
      .patch<User>(`${this.baseHref}api/users/${user._id}`, user)
      .pipe(
        map(() => true),
        catchError(this._handleError)
      );
  }
}
