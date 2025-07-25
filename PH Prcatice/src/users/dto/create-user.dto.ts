import { createZodDto } from 'nestjs-zod';

import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(['admin', 'user']),
  phone: z.string(),
  picture: z.url(),
  address: z.string(),
  isDeleted: z.boolean(),
  isActive: z.boolean(),
  isVerified: z.boolean(),
  auths: z.array(z.string()), // auth providers ex- google, facebook
});

export class CreateUserDto extends createZodDto(userSchema) {}