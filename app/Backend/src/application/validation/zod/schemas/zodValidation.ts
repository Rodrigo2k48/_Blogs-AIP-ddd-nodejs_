import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  user_name: z.string(),
  id: z.number().nullish(),
  image: z.string().optional(),
});
