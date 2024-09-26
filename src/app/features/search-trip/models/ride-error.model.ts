import { z } from 'zod';

export const IRideErrorSchema = z.object({
  message: z.string(),
  reason: z.string(),
  isError: z.boolean(),
});

export class IRideError {
  readonly message: string;

  readonly reason: string;

  readonly isError: boolean;

  constructor(data: z.infer<typeof IRideErrorSchema>) {
    this.message = data.message;
    this.reason = data.reason;
    this.isError = data.isError;
  }
}
