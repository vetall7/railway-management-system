/* global window */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthPayload, AuthRes } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(
    window.localStorage.getItem('isAuthenticated') === '1',
  );

  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signup(data: AuthPayload) {
    return this.http.post<AuthRes>('/api/signup', data);
  }

  signin(data: AuthPayload) {
    return this.http.post<AuthRes>('/api/signin', data);
  }

  logout() {
    this.isLoggedIn.next(false);
    window.localStorage.removeItem('isAuthenticated');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('login');
    this.router.navigate(['/']);
  }

  getProfileData() {
    return this.http.get('/api/profile');
  }
}
