export interface IPrice {
  carriage1: number;
  carriage2: number;
  carriage3: number;
  carriage4: number;
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
