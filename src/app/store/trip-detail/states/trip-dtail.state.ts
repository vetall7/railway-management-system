import { IRideError, IRideInformation } from '@features/search-trip/models';

import { ITripDetailState } from '../models';

export const tripInitialState: ITripDetailState = {
  rideData: {} as IRideInformation,
  error: {} as IRideError,
  isLoading: true,
};
