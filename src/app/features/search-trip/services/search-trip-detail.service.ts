import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRideInformation } from '@features/search-trip/models';
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

  public getRideInformation(id: string): Observable<IRideInformation> {
    const apiUrl = this.environmentService.getValue(
      environmentToken.apiUrl as keyof Environment,
    );
    return this.http.get<IRideInformation>(`${apiUrl}/search/${id}`);
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
        startDate: rideData.schedule.segments[this.startIndex].time[0],
        endDate: rideData.schedule.segments[this.endIndex - 1].time[1],
        firstCity: from,
        secondCity: to,
      } as IRideInformation | null;
    }
    return {} as IRideInformation | null;
  }
}
