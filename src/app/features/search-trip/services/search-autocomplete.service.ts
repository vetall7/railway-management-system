/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Station } from '@features/search-trip/models/trips.model';

interface ConnectedStation {
  id: number;
  distance: number;
}

interface StationResponse {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedStation[];
}

@Injectable()
export class SearchAutocompleteService {
  private stations: WritableSignal<Station[]> = signal([]);

  private readonly httpClient = inject(HttpClient);

  public fetchCities(): void {
    const url = '/api/station';

    this.httpClient.get<StationResponse[]>(url).subscribe((stations) => {
      const allStations = stations.map(
        (station) =>
          new Station({
            stationId: station.id,
            city: station.city,
            geolocation: {
              latitude: station.latitude,
              longitude: station.longitude,
            },
          }),
      );

      this.stations.set(allStations);
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
}
