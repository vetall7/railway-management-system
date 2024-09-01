import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ICarListItem,
  IPrice,
  IRideCarriage,
  IRideInformation,
  IRideSeatsInfo,
} from '@features/search-trip/models';
import { IRideCarriageData } from '@features/search-trip/models/ride-carriage-info.model';
import { EnvironmentService } from '@shared/services/environment.service';
import { environmentToken } from '@shared/tokens';
import { Observable } from 'rxjs';

import { Environment } from '../../../../environments/models';

@Injectable()
export class SearchTripDetailService {
  private readonly http = inject(HttpClient);

  private readonly environmentService = inject(EnvironmentService);

  private startIndex!: number;

  private endIndex!: number;

  private apiUrl = this.environmentService.getValue(
    environmentToken.apiUrl as keyof Environment,
  );

  public getRideInformation(id: string): Observable<IRideInformation> {
    return this.http.get<IRideInformation>(`${this.apiUrl}/search/${id}`);
  }

  public getCarriage(): Observable<IRideCarriageData[]> {
    return this.http.get<IRideCarriageData[]>(`${this.apiUrl}/carriage`);
  }

  public setTrainDates(
    rideData: IRideInformation | null,
    from: number | null,
    to: number | null,
  ): IRideInformation | null {
    if (rideData?.path?.length) {
      this.startIndex = rideData.path.indexOf(from ?? 0);
      this.endIndex = rideData.path.indexOf(to ?? 0);
      return {
        ...rideData,
        startDate: rideData.schedule.segments[this.startIndex]?.time[0],
        endDate: rideData.schedule.segments[this.endIndex - 1]?.time[1],
        firstCity: from,
        secondCity: to,
      } as IRideInformation | null;
    }
    return {} as IRideInformation | null;
  }

  public getCarriageData(
    rideData: IRideInformation | null,
    fullCarriageData: Record<string, ICarListItem[]>,
  ): IRideCarriage[] {
    if (rideData?.path?.length) {
      const result: IRideCarriage[] = [];
      const prices = this.getPrice(rideData);
      Object.keys(prices).forEach((key) => {
        result.push({
          typeName: key,
          price: prices[key as keyof IPrice],
          occupiedSeats: fullCarriageData[key].reduce(
            (accumulator, currentObject) => {
              return accumulator + (currentObject.occupiedSeats ?? 0);
            },
            0,
          ),
        });
      });
      return result;
    }
    return [] as IRideCarriage[];
  }

  private getPrice(rideData: IRideInformation | null): IPrice {
    const types = [...new Set(rideData?.carriages)].sort();
    const prices: IPrice = {} as IPrice;
    types.forEach((type) => {
      prices[type as keyof IPrice] = 0;
    });
    rideData?.schedule.segments.forEach((segment, index) => {
      if (index >= this.startIndex && index < this.endIndex) {
        Object.keys(segment.price).forEach((key) => {
          prices[key as keyof IPrice] += segment.price[key as keyof IPrice];
        });
      }
    });
    return prices;
  }

  public getAllOccupiedSeats(rideData: IRideInformation | null) {
    if (rideData?.path?.length) {
      const allOccupiedSeats: number[] = [];
      rideData?.schedule.segments.forEach((segment, index) => {
        if (index >= this.startIndex && index < this.endIndex) {
          allOccupiedSeats.push(...segment.occupiedSeats);
        }
      });
      return allOccupiedSeats as number[];
    }
    return [];
  }

  public calculateCarList(
    rideData: IRideInformation | null,
    carriageSeats: IRideSeatsInfo[],
    allOccupiedSeats: number[],
  ) {
    if (rideData?.path?.length) {
      const types = [...new Set(rideData?.carriages)].sort();
      const result: Record<string, ICarListItem[]> = {};
      types.forEach((type) => {
        result[type] = [];
      });
      let startIndex = 0;
      rideData?.carriages.forEach((carriage: string, index) => {
        const seats = carriageSeats.find(
          (value) => value.type === carriage,
        )?.seats;
        result[carriage].push({
          numberCar: index + 1,
          seats: [
            ...this.createRangeArray(startIndex + 1, (seats ?? 0) + startIndex),
          ],
          occupiedSeats: [
            ...this.createRangeArray(startIndex + 1, (seats ?? 0) + startIndex),
          ].filter((seat) => !allOccupiedSeats.includes(seat))?.length,
        });
        startIndex += seats ?? 0;
      });
      return result;
    }
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  public createRangeArray(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
}
