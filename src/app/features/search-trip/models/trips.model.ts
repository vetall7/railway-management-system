/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';

const GeolocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

class Geolocation {
  latitude: number;

  longitude: number;

  constructor(data: z.infer<typeof GeolocationSchema>) {
    const validatedData = GeolocationSchema.parse(data);
    this.latitude = validatedData.latitude;
    this.longitude = validatedData.longitude;
  }
}

const StationSchema = z.object({
  stationId: z.number(),
  city: z.string(),
  geolocation: GeolocationSchema,
});

export class Station {
  stationId: number;

  city: string;

  geolocation: Geolocation;

  constructor(data: z.infer<typeof StationSchema>) {
    const validatedData = StationSchema.parse(data);
    this.stationId = validatedData.stationId;
    this.city = validatedData.city;
    this.geolocation = new Geolocation(validatedData.geolocation);
  }
}

const SegmentSchema = z.object({
  time: z.array(z.string()).length(2),
  price: z.record(z.number()),
  occupiedSeats: z.array(z.number()),
});

class Segment {
  time: string[];

  price: Record<string, number>;

  occupiedSeats: number[];

  constructor(data: z.infer<typeof SegmentSchema>) {
    const validatedData = SegmentSchema.parse(data);
    this.time = validatedData.time;
    this.price = validatedData.price;
    this.occupiedSeats = validatedData.occupiedSeats;
  }
}

const ScheduleSchema = z.object({
  rideId: z.number(),
  segments: z.array(SegmentSchema),
});

class Schedule {
  rideId: number;

  segments: Segment[];

  constructor(data: z.infer<typeof ScheduleSchema>) {
    const validatedData = ScheduleSchema.parse(data);
    this.rideId = validatedData.rideId;
    this.segments = validatedData.segments.map(
      (segment) => new Segment(segment),
    );
  }
}

const RouteSchema = z.object({
  id: z.number(),
  path: z.array(z.number()),
  carriages: z.array(z.string()),
  schedule: z.array(ScheduleSchema),
});

export class Route {
  id: number;

  path: number[];

  carriages: string[];

  schedule: Schedule[];

  constructor(data: z.infer<typeof RouteSchema>) {
    const validatedData = RouteSchema.parse(data);
    this.id = validatedData.id;
    this.path = validatedData.path;
    this.carriages = validatedData.carriages;
    this.schedule = validatedData.schedule.map(
      (schedule) => new Schedule(schedule),
    );
  }
}

const SingleTripSchema = z.object({
  path: z.array(StationSchema),
  carriages: z.array(z.string()),
  from: StationSchema,
  to: StationSchema,
  schedule: ScheduleSchema,
});

export class SingleTrip {
  path: Station[];

  carriages: string[];

  from: Station;

  to: Station;

  schedule: Schedule;

  constructor(data: z.infer<typeof SingleTripSchema>) {
    const validatedData = SingleTripSchema.parse(data);
    this.path = validatedData.path;
    this.carriages = validatedData.carriages;
    this.from = new Station(validatedData.from);
    this.to = new Station(validatedData.to);
    this.schedule = new Schedule(validatedData.schedule);
  }
}

const TripDataSchema = z.object({
  from: StationSchema,
  to: StationSchema,
  routes: z.array(RouteSchema),
});

export class RoutesData {
  from: Station;

  to: Station;

  routes: Route[];

  constructor(data: z.infer<typeof TripDataSchema>) {
    const validatedData = TripDataSchema.parse(data);
    this.from = new Station(validatedData.from);
    this.to = new Station(validatedData.to);
    this.routes = validatedData.routes.map((route) => new Route(route));
  }
}
