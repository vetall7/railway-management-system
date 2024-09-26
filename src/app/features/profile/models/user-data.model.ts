import { z } from 'zod';

const userDataSchema = z.object({
  name: z.string().nullable(),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
});

export class UserData {
  public name: string | null;

  public email: string;

  public role: string;

  constructor(data: z.infer<typeof userDataSchema>) {
    const validatedData = userDataSchema.parse(data);
    this.name = validatedData.name;
    this.email = validatedData.email;
    this.role = validatedData.role;
  }
}
