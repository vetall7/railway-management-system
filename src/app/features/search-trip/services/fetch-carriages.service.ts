import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';

import { Carriage } from '../models/carriage.model';

@Injectable()
export class FetchCarriagesService {
  private readonly carriages: WritableSignal<Carriage[] | null> = signal(null);

  private readonly httpClient = inject(HttpClient);

  public get carriagesSignal(): Carriage[] | null {
    return this.carriages();
  }

  public fetchCarriages(): void {
    this.httpClient.get<Carriage[]>('/api/carriage').subscribe((carriages) => {
      const carriagesData = carriages.map((carriage) => new Carriage(carriage));
      this.carriages.set(carriagesData);
    });
  }

  public readonly carriagesWithNumberOfSeats = computed(() => {
    const carriages = this.carriages();
    const map = new Map<string, number>();

    if (carriages) {
      carriages.forEach((carriage) => {
        map.set(
          carriage.name,
          carriage.rows * (carriage.leftSeats + carriage.rightSeats),
        );
      });
    }
    return map;
  });
}
