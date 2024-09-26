import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE } from '@shared/web-storage';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthPayload, AuthRes } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storage = inject<Storage>(STORAGE);

  public isLoggedIn = new BehaviorSubject(this.storage.getItem('isAuthenticated') === '1');

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
    this.storage.removeItem('isAuthenticated');
    this.storage.removeItem('token');
    this.storage.removeItem('login');
    this.router.navigate(['/']);
  }

  public getProfileData(): Observable<unknown> {
    return this.http.get('/api/profile');
  }
}
