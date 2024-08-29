import { z } from 'zod';

export const CountrySchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type TCountry = z.infer<typeof CountrySchema>;