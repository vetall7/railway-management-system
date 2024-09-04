import { inject, Injectable } from '@angular/core';
import { STORAGE, Storage } from '@shared/web-storage';

@Injectable()
export class AuthenticationService {
  private readonly storage = inject<Storage>(STORAGE);

  public isManager(): boolean {
    return this.storage.getItem('login') === 'admin@admin.com';
  }
}
