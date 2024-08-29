export interface ISegmentsRide {
  time: string[];
  price: Record<string, number>;
}

export interface IScheduleRide {
  rideId: number;
  segments: ISegmentsRide[];
}

export interface IDataRide {
  id: number;
  path: number[];
  carriages: string[];
  schedule: IScheduleRide[];
}
