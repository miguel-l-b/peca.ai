import { z } from 'zod';
import { VehicleSchema } from './vehicle';
import { PartSchema } from './part';
import { TCountry } from './country';

export const BrandSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    imageUrl: z.string().url(),
    country: z.string(),
    foundedAt: z.date(),
    vehicles: z.array(VehicleSchema).optional(),
    parts: z.array(PartSchema).optional(),
});

export type TBrand = z.infer<typeof BrandSchema> & { country: TCountry };

export const BrandCreateSchema = BrandSchema.omit({ id: true, vehicles: true, parts: true });
export type TBrandCreate = z.infer<typeof BrandCreateSchema>;

export const BrandUpdateSchema = BrandSchema.partial({
    name: true,
    imageUrl: true,
    country: true,
    foundedAt: true,
}).omit({ vehicles: true, parts: true });
export type TBrandUpdate = z.infer<typeof BrandUpdateSchema>;