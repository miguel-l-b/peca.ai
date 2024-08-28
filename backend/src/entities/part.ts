import { z } from 'zod';
import { BrandSchema } from './brand';

export const PartSchema = z.object({
    name: z.string(),
    barcode: z.string(),
    price: z.number(),
    stock: z.number(),
    brand: z.bigint(),
    imageUrl: z.string().url(),
    vehicleIds: z.array(z.bigint()).optional(),
});

export type TPart = z.infer<typeof PartSchema>;