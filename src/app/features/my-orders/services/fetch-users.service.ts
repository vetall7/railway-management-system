import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@features/my-orders/models';
import { lastValueFrom } from 'rxjs';

import { FetchDataService } from './fetch-data.service';

@Injectable()
export class FetchUsersService {
  private readonly users: WritableSignal<User[]> = signal([]);

  private readonly FetchDataService = inject(FetchDataService);

  public async fetchUsers(): Promise<void> {
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

  public isManager(id: number): boolean {
    const user = this.getUserById(id);
    return user ? user.role === 'manager' : false;
  }
}
