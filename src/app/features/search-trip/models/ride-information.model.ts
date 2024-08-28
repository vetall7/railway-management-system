export interface IPrice {
  readonly carriage1: number;
  readonly carriage2: number;
  readonly carriage3: number;
  readonly carriage4: number;
}

export interface ISegments {
  readonly time: string[];
  readonly price: IPrice;
  readonly occupiedSeats: number[];
}

export interface ISchedule {
  readonly segments: ISegments[];
}

export interface IRideInformation {
  readonly rideId: number;
  readonly path: number[];
  readonly carriages: string[];
  readonly schedule: ISchedule;
  readonly startDate: string;
  readonly endDate: string;
  readonly firstCity: number | null;
  readonly secondCity: number | null;
}

export interface IQuery {
  readonly from: string;
  readonly to: string;
}
