import { z } from 'zod';
import { CountrySchema } from '../schemas';

export type TCountry = z.infer<typeof CountrySchema>;