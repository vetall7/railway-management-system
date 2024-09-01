import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthPayload, AuthRes } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: AuthPayload) {
    return this.http.post<AuthRes>('/api/signup', data);
  }

  signin(data: AuthPayload) {
    return this.http.post<AuthRes>('/api/signin', data);
  }
}
