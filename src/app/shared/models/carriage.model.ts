import { z } from 'zod';

export const CarriageSchema = z.object({
  code: z.string(),
  name: z.string(),
  rows: z.number(),
  leftSeats: z.number(),
  rightSeats: z.number(),
});

export class Carriage {
  readonly code: string;

  readonly name: string;

  readonly rows: number;

  readonly leftSeats: number;

  readonly rightSeats: number;

  constructor(data: z.infer<typeof CarriageSchema>) {
    const validatedData = CarriageSchema.parse(data);
    this.code = validatedData.code;
    this.name = validatedData.name;
    this.rows = validatedData.rows;
    this.leftSeats = validatedData.leftSeats;
    this.rightSeats = validatedData.rightSeats;
  }
}
