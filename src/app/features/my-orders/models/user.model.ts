import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'manager']),
});

export class User {
  readonly id: number;

  readonly name: string;

  readonly email: string;

  readonly role: 'user' | 'manager';

  constructor(data: z.infer<typeof UserSchema>) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
  }
}

export const UserListSchema = z.array(UserSchema);
