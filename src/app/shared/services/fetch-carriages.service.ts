/* eslint-disable prettier/prettier */
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Carriage } from '@shared/models/carriage.model';
import { SingleTrip } from '@shared/models/trips.model';
import { lastValueFrom } from 'rxjs';

import { FetchApiDataService } from './fetch-api-data.service';

@Injectable()
export class FetchCarriagesService {
  private readonly fetchData = inject(FetchApiDataService);

  private carriages: WritableSignal<Carriage[] | null> = signal(null);

  public get carriagesSignal(): Carriage[] | null {
    return this.carriages();
  }

  public async fetchCarriages(): Promise<void> {
    try {
      const carriages = await lastValueFrom(this.fetchData.fetchCarriages());
      this.carriages.set(carriages);
    } catch (error) {
      console.error('Error fetching carriages:', error);
    }
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

  // eslint-disable-next-line class-methods-use-this
  private getAllOccupiedSeats(trip: SingleTrip): number[] {
    const occupiedSeats = [];
    if (trip) {
      const indexOfStartStation = trip.path.findIndex(
        (station) => station.stationId === trip.from.stationId,
      );
      const indexOfEndStation = trip.path.findIndex(
        (station) => station.stationId === trip.to.stationId,
      );
      for (let i = indexOfStartStation; i < indexOfEndStation; i += 1) {
        const occupiedSeatsInSegment = trip.schedule.segments[i].occupiedSeats;
        if (occupiedSeatsInSegment) {
          occupiedSeats.push(...occupiedSeatsInSegment);
        }
      }
    }
    return occupiedSeats;
  }

  public getCarriagesWithNumberOfAvailableSeats(
    trip: SingleTrip,
  ): Map<string, number> {
    const carriagesWithNumberOfAvailableSeats = new Map<string, number>();
    const allOccupiedSeats = this.getAllOccupiedSeats(trip);
    const carriagesWithNumberOfSeats = this.carriagesWithNumberOfSeats();

    if (trip) {
      const allCariages = trip.carriages;
      let currentCarriageStartIndex = 0;
      allCariages.forEach((carriage) => {
        const numberOfSeats = carriagesWithNumberOfSeats.get(carriage);
        if (numberOfSeats) {
          const numberOfOccupiedSeatsInCarriage = allOccupiedSeats.slice(
            currentCarriageStartIndex,
            currentCarriageStartIndex + numberOfSeats,
          ).length;
          const numberOfAvailableSeats = numberOfSeats - numberOfOccupiedSeatsInCarriage;
          carriagesWithNumberOfAvailableSeats.set(
            carriage,
            numberOfAvailableSeats,
          );
          currentCarriageStartIndex += numberOfSeats;
        }
      });
    }
    return carriagesWithNumberOfAvailableSeats;
  }
}
