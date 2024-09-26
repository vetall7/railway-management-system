import { z } from 'zod';

export const IRideCarriageSchema = z.object({
  typeName: z.string(),
  price: z.number().positive(),
  occupiedSeats: z.number().int().nonnegative(),
});

export class IRideCarriage {
  readonly typeName: string;

  readonly price: number;

  readonly occupiedSeats: number;

  constructor(data: z.infer<typeof IRideCarriageSchema>) {
    this.typeName = data.typeName;
    this.price = data.price;
    this.occupiedSeats = data.occupiedSeats;
  }
}
