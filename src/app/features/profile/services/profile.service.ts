import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiError } from '@features/auth/models/auth.model';
import { UserData } from '@features/profile/models/user-data.model';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';

import {
  UpdatePasswordPayload,
  UpdateUserPayload,
} from '../models/payloads.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  getProfileData() {
    return this.http
      .get<UserData>('/api/profile')
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  updateUser(payload: UpdateUserPayload) {
    return this.http
      .put<UserData>('/api/profile', payload)
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  updatePassword(payload: UpdatePasswordPayload) {
    return this.http
      .put<''>('/api/profile/password', payload)
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  logout() {
    return this.http
      .delete('/api/logout')
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  handleError(error: ApiError) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.error.message,
    });
  }
}
