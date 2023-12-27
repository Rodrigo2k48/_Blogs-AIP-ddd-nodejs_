import { z } from 'zod';
import { userSchema } from './zodValidation';

export type UserZod = z.infer<typeof userSchema>;
