/* eslint-disable max-classes-per-file */
import { z } from 'zod';

const StatusSchema = z.enum(['active', 'completed', 'rejected', 'canceled']);

const OrderSchema = z.object({
  id: z.number(),
  userName: z.string().optional(),
  startTripStation: z.string(),
  startTripTime: z.string().datetime(),
  endTripStation: z.string(),
  endTripTime: z.string().datetime(),
  tripDuration: z.string(),
  carriageType: z.string(),
  carNumber: z.string(),
  seatNumber: z.string(),
  price: z.number(),
  status: StatusSchema,
});

export type Status = 'active' | 'completed' | 'rejected' | 'canceled';

export class Order {
  readonly id: number;

  readonly userName: string | undefined;

  readonly startTripStation: string;

  readonly startTripTime: string;

  readonly endTripStation: string;

  readonly endTripTime: string;

  readonly tripDuration: string;

  readonly carriageType: string;

  readonly carNumber: string;

  readonly seatNumber: string;

  readonly price: number;

  status: Status;

  constructor(data: z.infer<typeof OrderSchema>) {
    this.id = data.id;
    this.userName = data.userName;
    this.startTripStation = data.startTripStation;
    this.startTripTime = data.startTripTime;
    this.endTripStation = data.endTripStation;
    this.endTripTime = data.endTripTime;
    this.tripDuration = data.tripDuration;
    this.carriageType = data.carriageType;
    this.carNumber = data.carNumber;
    this.seatNumber = data.seatNumber;
    this.price = data.price;
    this.status = data.status;
  }
}
