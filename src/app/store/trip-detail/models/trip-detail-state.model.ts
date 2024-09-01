import { IRideError, IRideInformation } from '@features/search-trip/models';

export interface ITripDetailState {
  rideData: IRideInformation;
  error: IRideError;
  isLoading: boolean;
}

export interface ITripDetailFacade {
  loadRide(id: string): void;
}
