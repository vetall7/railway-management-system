/* eslint-disable max-classes-per-file */
import { z } from 'zod';

const ScheduleSegmentSchema = z.object({
  segments: z.array(
    z.object({
      time: z.tuple([z.string().datetime(), z.string().datetime()]),
      price: z.record(z.string(), z.number()),
    }),
  ),
});

const OrderResponseSchema = z.object({
  id: z.number(),
  rideId: z.number(),
  stationStart: z.number(),
  stationEnd: z.number(),
  routeId: z.number(),
  seatId: z.number(),
  userId: z.number(),
  status: z.enum(['active', 'completed', 'rejected', 'canceled']),
  path: z.array(z.number()),
  carriages: z.array(z.string()),
  schedule: ScheduleSegmentSchema,
});

class ScheduleSegment {
  readonly segments: {
    readonly time: [string, string];
    readonly price: Record<string, number>;
  }[];

  constructor(data: z.infer<typeof ScheduleSegmentSchema>) {
    this.segments = data.segments;
  }
}

export class OrderResponse {
  readonly id: number;

  readonly stationStart: number;

  readonly stationEnd: number;

  readonly rideId: number;

  readonly routeId: number;

  readonly seatId: number;

  readonly userId: number;

  readonly status: 'active' | 'completed' | 'rejected' | 'canceled';

  readonly path: number[];

  readonly carriages: string[];

  readonly schedule: ScheduleSegment;

  constructor(data: z.infer<typeof OrderResponseSchema>) {
    this.id = data.id;
    this.rideId = data.rideId;
    this.stationStart = data.stationStart;
    this.stationEnd = data.stationEnd;
    this.routeId = data.routeId;
    this.seatId = data.seatId;
    this.userId = data.userId;
    this.status = data.status;
    this.path = data.path;
    this.carriages = data.carriages;
    this.schedule = new ScheduleSegment(data.schedule);
  }
}

export const OrderListSchema = z.array(OrderResponseSchema);
