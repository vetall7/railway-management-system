import { IRideError, IRideInformation } from '@features/search-trip/models';
import { createActionGroup, props } from '@ngrx/store';

import { tripDetailToken } from '../tokens';

export const TripDetailActions = createActionGroup({
  source: tripDetailToken,
  events: {
    rideLoaded: props<{ id: string }>(),
    rideLoadedSuccess: props<{ rideData: IRideInformation }>(),
    rideLoadFailure: props<{ error: IRideError }>(),
  },
});
