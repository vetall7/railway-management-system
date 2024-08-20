import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { Environment } from '../../../environments/models/environment.model';

export const ENVIRONMENT = new InjectionToken<Environment>('environment');

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly environment: Environment | null;

  constructor(
    @Optional() @Inject(ENVIRONMENT) environment: Environment | null,
  ) {
    this.environment = environment ?? null;
  }

  getValue<T>(key: keyof Environment, defaultValue?: T): T {
    return (this.environment?.[key] ?? defaultValue) as T;
  }
}
