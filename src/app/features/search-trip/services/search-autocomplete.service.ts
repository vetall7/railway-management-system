/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { City } from '@features/search-trip/models/city';

interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
}

@Injectable()
export class SearchAutocompleteService {
  private cities: WritableSignal<City[]> = signal([]);

  private readonly httpClient = inject(HttpClient);

  public fetchCities(): void {
    const url = '/api/station';

    this.httpClient.get<Station[]>(url).subscribe((stations) => {
      this.cities.set(
        stations.map((station) => ({
          name: station.city,
          latitude: station.latitude,
          longitude: station.longitude,
        })),
      );
    });
  }

  public getCitiesNames(): string[] {
    return this.cities().map((city) => city.name);
  }

  public getCityByName(name: string): City | undefined {
    return this.cities().find((city) => city.name === name);
  }
}
