import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiError } from '@features/auth/models/auth.model';
import { UserData } from '@features/profile/models/user-data.model';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { ZodError } from 'zod';

import {
  UpdatePasswordPayload,
  UpdateUserPayload,
} from '../../features/profile/models/payloads.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  private readonly messageService = inject(MessageService);

  public getProfileData(): Observable<UserData> {
    return this.http.get<UserData>('/api/profile').pipe(
      map((data) => new UserData(data)),
      catchError((error) => {
        if (error instanceof ZodError) {
          console.error('Validation failed:', error.errors);
        } else {
          console.error('Invalid data type received:', error);
        }
        throw error;
      }),
    );
  }

  public updateUser(payload: UpdateUserPayload): Observable<null | UserData> {
    return this.http.put<UserData>('/api/profile', payload).pipe(
      map((data) => new UserData(data)),
      catchError((error) => {
        this.handleError(error);
        return of(null);
      }),
    );
  }

  public updatePassword(payload: UpdatePasswordPayload): Observable<string> {
    return this.http.put<string>('/api/profile/password', payload).pipe(
      catchError((error) => {
        this.handleError(error);
        return of('');
      }),
    );
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
