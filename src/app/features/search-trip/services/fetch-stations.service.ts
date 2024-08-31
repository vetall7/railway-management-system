/* eslint-disable no-console */
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Station } from '@features/search-trip/models/trips.model';

import { FetchApiDataService } from './fetch-api-data.service';

@Injectable()
export class FetchStationsService {
  private stations: WritableSignal<Station[]> = signal([]);

  private readonly fetchDataService = inject(FetchApiDataService);

  public fetchStations(): void {
    this.fetchDataService.fetchStations().subscribe((stations) => {
      this.stations.set(stations);
    });
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
