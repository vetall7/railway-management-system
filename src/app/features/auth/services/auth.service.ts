/* global window */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthPayload, AuthRes } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = new BehaviorSubject(window.localStorage.getItem('isAuthenticated') === '1');

  public isLoggedIn$ = this.isLoggedIn.asObservable();

  private readonly router = inject(Router);

  private readonly http = inject(HttpClient);

  public signup(data: AuthPayload): Observable<AuthRes> {
    return this.http.post<AuthRes>('/api/signup', data);
  }

  public signin(data: AuthPayload): Observable<AuthRes> {
    return this.http.post<AuthRes>('/api/signin', data);
  }

  public logout(): void {
    this.isLoggedIn.next(false);
    window.localStorage.removeItem('isAuthenticated');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('login');
    this.router.navigate(['/']);
  }

  public getProfileData(): Observable<unknown> {
    return this.http.get('/api/profile');
  }
}
