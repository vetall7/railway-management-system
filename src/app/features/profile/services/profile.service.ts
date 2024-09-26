import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiError } from '@features/auth/models/auth.model';
import { UserData } from '@features/profile/models/user-data.model';
import { MessageService } from 'primeng/api';
import { catchError, Observable, of } from 'rxjs';

import { UpdatePasswordPayload, UpdateUserPayload } from '../models/payloads.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  private readonly messageService = inject(MessageService);

  public getProfileData(): Observable<void | UserData> {
    return this.http
      .get<UserData>('/api/profile')
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  public updateUser(payload: UpdateUserPayload): Observable<void | UserData> {
    return this.http
      .put<UserData>('/api/profile', payload)
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  public updatePassword(payload: UpdatePasswordPayload): Observable<void | ''> {
    return this.http
      .put<''>('/api/profile/password', payload)
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  public logout() {
    return this.http.delete('/api/logout').pipe(catchError((err) => of(this.handleError(err))));
  }

  public handleError(error: ApiError): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.error.message,
    });
  }
}
