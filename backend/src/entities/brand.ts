import { z } from 'zod';
import { VehicleSchema } from './vehicle';
import { PartSchema } from './part';
import { TCountry } from './country';
import FilterSchema from './filter';

export const BrandSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    imageUrl: z.string().url(),
    country: z.string(),
    foundedAt: z.date().or(z.string().date().transform((val) => new Date(val))),
    vehicles: z.array(VehicleSchema).optional(),
    parts: z.array(PartSchema).optional(),
});
export type TBrand = z.infer<typeof BrandSchema> & { country: TCountry };

export const BrandFindByIdSchema = z.object({ id: z.string().transform((val) => parseInt(val)) }).or(BrandSchema.pick({ id: true }));
export type TBrandFindById = z.infer<typeof BrandFindByIdSchema>;

export const BrandSortSchema = z.object({
    field: BrandSchema.omit({ vehicles: true, parts: true }).keyof().optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
});
export type TBrandSort = z.infer<typeof BrandSortSchema>;

export const BrandFilterSchema = z.object({ sort: BrandSortSchema }).and(FilterSchema);
export type TBrandFilter = z.infer<typeof BrandFilterSchema>;

export const BrandCreateSchema = BrandSchema.omit({ id: true, vehicles: true, parts: true });
export type TBrandCreate = z.infer<typeof BrandCreateSchema>;

export const BrandUpdateSchema = BrandSchema.partial({
    name: true,
    imageUrl: true,
    country: true,
    foundedAt: true,
}).omit({ vehicles: true, parts: true, id: true }).and(BrandFindByIdSchema);
export type TBrandUpdate = z.infer<typeof BrandUpdateSchema>;