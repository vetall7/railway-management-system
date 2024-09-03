import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@features/my-orders/models';
import { AuthenticationService } from '@shared/services';
import { lastValueFrom } from 'rxjs';

import { FetchDataService } from './fetch-data.service';

@Injectable()
export class FetchUsersService {
  private readonly users: WritableSignal<User[]> = signal([]);

  private readonly FetchDataService = inject(FetchDataService);

  private authService = inject(AuthenticationService);

  // eslint-disable-next-line consistent-return
  public async fetchUsers(): Promise<void> {
    if (!this.authService.isManager()) {
      return Promise.resolve();
    }
    try {
      const users = await lastValueFrom(this.FetchDataService.fetchAllUsers());
      this.users.set(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  public getUserById(id: number): User | undefined {
    return this.users().find((user) => user.id === id);
  }
}
