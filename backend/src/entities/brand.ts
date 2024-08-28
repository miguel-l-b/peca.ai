import { z } from 'zod';

export const BrandSchema = z.object({
    name: z.string(),
    imageUrl: z.string().url(),
    country: z.string(),
    foundedAt: z.date(),
});

export type TBrand = z.infer<typeof BrandSchema>;