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

  public getRideInformation(id: string): Observable<IRideInformation> {
    const apiUrl = this.environmentService.getValue(
      environmentToken.apiUrl as keyof Environment,
    );
    return this.http.get<IRideInformation>(`${apiUrl}/search/${id}`);
  }
}
