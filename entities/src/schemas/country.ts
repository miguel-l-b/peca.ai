import { z } from 'zod';

export const CountrySchema = z.object({
    id: z.number().positive(),
    name: z.string(),
});