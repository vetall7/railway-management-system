/* eslint-disable no-console */
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Station } from '@shared/models/trips.model';
import { lastValueFrom } from 'rxjs';

import { FetchApiDataService } from './fetch-api-data.service';

@Injectable()
export class FetchStationsService {
  private readonly stations: WritableSignal<Station[]> = signal([]);

  private readonly fetchDataService = inject(FetchApiDataService);

  private readonly isLoading = signal(false);

  public async fetchStations(): Promise<void> {
    try {
      this.isLoading.set(true);
      const stations = await lastValueFrom(this.fetchDataService.fetchStations());
      this.isLoading.set(false);
      this.stations.set(stations);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  }

  public get isLoadingSig(): WritableSignal<boolean> {
    return this.isLoading;
  }

  public getCitiesNames(): string[] {
    return this.stations().map((station) => station.city);
  }

  public getCityByName(name: string): Station | undefined {
    return this.stations().find((station) => station.city === name);
  }

  public getCityById(id: number): Station | undefined {
    return this.stations().find((station) => station.stationId === id);
  }

  public getCities(): Station[] {
    return this.stations();
  }

  public getCitiesByIds(ids: number[]): Station[] {
    const cities = ids.map((id) => this.getCityById(id));
    if (cities.includes(undefined)) {
      throw new Error('City not found');
    }
    return cities as Station[];
  }
}
