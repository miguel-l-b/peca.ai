import { z } from 'zod';
import FilterSchema from './filter';
import { BrandSchema } from 'entities';

export const PartSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    barcode: z.string().regex(/^\d{8,}$/),
    price: z.number().positive(),
    stock: z.number().optional(),
    brandId: z.number().positive(),
    brand: BrandSchema.optional(),
    imageUrl: z.string().url(),
});
export type TPart = z.infer<typeof PartSchema>;

export const PartCreateSchema = PartSchema.omit({ id: true, stock: true });
export type TPartCreate = z.infer<typeof PartCreateSchema>;

export const PartFindByIdSchema = z.object({ id: z.string().transform((val) => parseInt(val)) }).or(PartSchema.pick({ id: true }));
export type TPartFindById = z.infer<typeof PartFindByIdSchema>;

export const PartUpdateSchema = PartSchema.partial({
    name: true,
    barcode: true,
    price: true,
    stock: true,
    imageUrl: true,
}).omit({ brandId: true, id: true }).and(PartFindByIdSchema);
export type TPartUpdate = z.infer<typeof PartUpdateSchema>;

export const PartSortSchema = z.object({
    field: PartSchema.omit({ brandId: true, imageUrl: true }).keyof().optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
});
export type TPartSort = z.infer<typeof PartSortSchema>;

export const PartFilterSchema = z.object({ sort: PartSortSchema }).and(FilterSchema);
export type TPartFilter = z.infer<typeof PartFilterSchema>;

export const PartManagerVehicleSchema = z.object({
    id: z.number().int().or(z.string().transform((val) => parseInt(val))),
    vehicleId: z.number().int().or(z.string().transform((val) => parseInt(val)))
});
export type TPartManagerVehicle = z.infer<typeof PartManagerVehicleSchema>;