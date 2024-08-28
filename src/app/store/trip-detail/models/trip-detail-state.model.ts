import { IRideError, IRideInformation } from '@features/search-trip/models';

export interface ITripDetailState {
  rideData: IRideInformation;
  error: IRideError;
}

export interface ITripDetailFacade {
  loadRide(id: string): void;
}
