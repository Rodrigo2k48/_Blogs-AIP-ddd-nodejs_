import { z } from 'zod';

export const loginInputSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .required();

export const userInputSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    userName: z.string(),
    image: z.string(),
  })
  .required();

export const categoryInputSchema = z
  .object({
    name: z.string(),
  })
  .required();
