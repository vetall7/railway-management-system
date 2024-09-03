/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';

import { Storage } from './storage-interface';

@Injectable()
export class LocalStorageService implements Storage {
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
