/* eslint-disable max-classes-per-file */
import { z } from 'zod';

export const ConnectedStationSchema = z.object({
  id: z.number(),
  distance: z.number(),
});

export const StationSchema = z.object({
  id: z.number(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  connectedTo: z.array(ConnectedStationSchema),
});

class ConnectedStation {
  readonly id: number;

  readonly distance: number;

  constructor(data: z.infer<typeof ConnectedStationSchema>) {
    const validatedData = ConnectedStationSchema.parse(data);
    this.id = validatedData.id;
    this.distance = validatedData.distance;
  }
}

export class StationResponse {
  readonly id: number;

  readonly city: string;

  readonly latitude: number;

  readonly longitude: number;

  readonly connectedTo: ConnectedStation[];

  constructor(data: z.infer<typeof StationSchema>) {
    const validatedData = StationSchema.parse(data);
    this.id = validatedData.id;
    this.city = validatedData.city;
    this.latitude = validatedData.latitude;
    this.longitude = validatedData.longitude;
    this.connectedTo = validatedData.connectedTo.map(
      (station) => new ConnectedStation(station),
    );
  }
}

export const StationArraySchema = z.array(StationSchema);
