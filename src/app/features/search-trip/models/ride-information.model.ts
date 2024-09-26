/* eslint-disable max-classes-per-file */
import { z } from 'zod';

export const PriceSchema = z.object({
  carriage1: z.number().positive(),
  carriage2: z.number().positive(),
  carriage3: z.number().positive(),
  carriage4: z.number().positive(),
});

export const SegmentsSchema = z.object({
  time: z.array(z.string()),
  price: PriceSchema,
  occupiedSeats: z.array(z.number().int()),
});

export const ScheduleSchema = z.object({
  segments: z.array(SegmentsSchema),
});

export const RideInformationSchema = z.object({
  rideId: z.number(),
  path: z.array(z.number()),
  carriages: z.array(z.string()),
  schedule: ScheduleSchema,
  startDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Invalid start date format',
  }),
  endDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Invalid end date format',
  }),
  firstCity: z.number().nullable(),
  secondCity: z.number().nullable(),
});

export const QuerySchema = z.object({
  from: z.string(),
  to: z.string(),
});

export class IPrice {
  carriage1: number;

  carriage2: number;

  carriage3: number;

  carriage4: number;

  constructor(data: z.infer<typeof PriceSchema>) {
    const validatedData = PriceSchema.parse(data);
    this.carriage1 = validatedData.carriage1;
    this.carriage2 = validatedData.carriage2;
    this.carriage3 = validatedData.carriage3;
    this.carriage4 = validatedData.carriage4;
  }
}

export class ISegments {
  readonly time: string[];

  readonly price: IPrice;

  readonly occupiedSeats: number[];

  constructor(data: z.infer<typeof SegmentsSchema>) {
    const validatedData = SegmentsSchema.parse(data);
    this.time = validatedData.time;
    this.price = new IPrice(validatedData.price);
    this.occupiedSeats = validatedData.occupiedSeats;
  }
}

export class ISchedule {
  readonly segments: ISegments[];

  constructor(data: z.infer<typeof ScheduleSchema>) {
    const validatedData = ScheduleSchema.parse(data);
    this.segments = validatedData.segments.map((segment) => new ISegments(segment));
  }
}

export class IRideInformation {
  readonly rideId: number;

  readonly path: number[];

  readonly carriages: string[];

  readonly schedule: ISchedule;

  readonly startDate: string;

  readonly endDate: string;

  readonly firstCity: number | null;

  readonly secondCity: number | null;

  constructor(data: z.infer<typeof RideInformationSchema>) {
    const validatedData = RideInformationSchema.parse(data);
    this.rideId = validatedData.rideId;
    this.path = validatedData.path;
    this.carriages = validatedData.carriages;
    this.schedule = new ISchedule(validatedData.schedule);
    this.startDate = validatedData.startDate;
    this.endDate = validatedData.endDate;
    this.firstCity = validatedData.firstCity;
    this.secondCity = validatedData.secondCity;
  }
}

export class IQuery {
  readonly from: string;

  readonly to: string;

  constructor(data: z.infer<typeof QuerySchema>) {
    const validatedData = QuerySchema.parse(data);
    this.from = validatedData.from;
    this.to = validatedData.to;
  }
}
