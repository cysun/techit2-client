import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { LoginResponse } from '../models/loginResponse.model';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private http: HttpClient
  ) {}

  private currentUserSubject = new BehaviorSubject<User>(
    this._getCurrentUser()
  );

  private _handleError(error: HttpErrorResponse) {
    return throwError(
      error.error instanceof ErrorEvent
        ? error.error.message
        : `${error.status} ${error.error.message}`
    );
  }

  private _getCurrentUser(): User {
    const jsonUser = localStorage.getItem('currentUser');
    return jsonUser != null ? User.fromObj(JSON.parse(jsonUser)) : null;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.baseHref}api/login`, { username, password })
      .pipe(
        map(loginResponse => {
          const currentUser = jwtHelper.decodeToken(loginResponse.token);
          localStorage.clear();
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          localStorage.setItem('jwtToken', loginResponse.token);
          this.currentUserSubject.next(User.fromObj(currentUser));
          return true;
        }),
        catchError(this._handleError)
      );
  }

  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUserSubject;
  }

  updateProfile(user: User): Observable<boolean> {
    return this.http.patch<User>(`${this.baseHref}api/users/${user._id}`, user).pipe(
      map(updatedUser => {
        this.currentUserSubject.next(User.fromObj(updatedUser));
        return true;
      }),
      catchError(this._handleError)
    );
  }
}
