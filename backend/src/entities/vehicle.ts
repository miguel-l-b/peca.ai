import { z } from 'zod';
import { BrandSchema } from './brand';

export const VehicleSchema = z.object({
    name: z.string(),
    year: z.number(),
    fabricatedAt: z.date(),
    brand: z.bigint(),
    imageUrl: z.string().url(),
});

export type TVehicle = z.infer<typeof VehicleSchema>;