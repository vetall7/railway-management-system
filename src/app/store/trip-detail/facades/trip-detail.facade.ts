import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TripDetailActions } from '../actions';
import { ITripDetailFacade } from '../models';
import { TripDetailSelector } from '../selectors';

@Injectable({ providedIn: 'root' })
export class TripDetailFacade implements ITripDetailFacade {
  private readonly store = inject(Store);

  public readonly rideData = this.store.selectSignal(
    TripDetailSelector.selectRideData,
  );

  public readonly rideError = this.store.selectSignal(
    TripDetailSelector.selectError,
  );

  public loadRide(id: string) {
    this.store.dispatch(TripDetailActions.rideLoaded({ id }));
  }
}
