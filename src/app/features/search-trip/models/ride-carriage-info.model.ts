/* eslint-disable max-classes-per-file */
import { z } from 'zod';

export const IRideCarriageDataSchema = z.object({
  code: z.string(),
  leftSeats: z.number().int().nonnegative(),
  name: z.string(),
  rightSeats: z.number().int().nonnegative(),
  rows: z.number().int().positive(),
});

export const IRideSeatsInfoSchema = z.object({
  type: z.string(),
  seats: z.number().int().nonnegative(),
});

export const ICarListItemSchema = z.object({
  numberCar: z.number().int().positive(),
  seats: z.array(z.number().int()),
  occupiedSeats: z.number().int().optional().nullable(),
});

export const ICarModalDataSchema = z.object({
  car: z.number().int().positive(),
  numberSeat: z.number().int().positive(),
});

export const ICarModalDataInfoSchema = ICarModalDataSchema.extend({
  price: z.number().positive(),
});

export const IDataToResponseSchema = z.object({
  rideId: z.number().int().positive(),
  seat: z.number().int().positive(),
  stationStart: z.number().int().positive(),
  stationEnd: z.number().int().positive(),
});

export const IOrderResponseSchema = z.object({
  id: z.string(),
});

export class IRideCarriageData {
  readonly code: string;

  readonly leftSeats: number;

  readonly name: string;

  readonly rightSeats: number;

  readonly rows: number;

  constructor(data: z.infer<typeof IRideCarriageDataSchema>) {
    this.code = data.code;
    this.leftSeats = data.leftSeats;
    this.name = data.name;
    this.rightSeats = data.rightSeats;
    this.rows = data.rows;
  }
}

export class IRideSeatsInfo {
  readonly type: string;

  readonly seats: number;

  constructor(data: z.infer<typeof IRideSeatsInfoSchema>) {
    this.type = data.type;
    this.seats = data.seats;
  }
}

export class ICarListItem {
  readonly numberCar: number;

  readonly seats: number[];

  readonly occupiedSeats: number | null | undefined;

  constructor(data: z.infer<typeof ICarListItemSchema>) {
    this.numberCar = data.numberCar;
    this.seats = data.seats;
    this.occupiedSeats = data.occupiedSeats;
  }
}

export class ICarModalData {
  readonly car: number;

  readonly numberSeat: number;

  constructor(data: z.infer<typeof ICarModalDataSchema>) {
    this.car = data.car;
    this.numberSeat = data.numberSeat;
  }
}

export class ICarModalDataInfo extends ICarModalData {
  readonly price: number;

  constructor(data: z.infer<typeof ICarModalDataInfoSchema>) {
    super(data);
    this.price = data.price;
  }
}

export class IDataToResponse {
  readonly rideId: number;

  readonly seat: number;

  readonly stationStart: number;

  readonly stationEnd: number;

  constructor(data: z.infer<typeof IDataToResponseSchema>) {
    this.rideId = data.rideId;
    this.seat = data.seat;
    this.stationStart = data.stationStart;
    this.stationEnd = data.stationEnd;
  }
}

export class IOrderResponse {
  readonly id: string;

  constructor(data: z.infer<typeof IOrderResponseSchema>) {
    this.id = data.id;
  }
}
