import { z } from 'zod';
import { FilterSchema } from './filter';

export const PartSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    barcode: z.string().regex(/^\d{8,}$/),
    price: z.number().positive(),
    stock: z.number().optional(),
    brandId: z.number().positive(),
    imageUrl: z.string().url(),
});

export const PartCreateSchema = PartSchema.omit({ id: true, stock: true });

export const PartFindByIdSchema = z.object({ id: z.string().transform((val) => parseInt(val)) }).or(PartSchema.pick({ id: true }));

export const PartUpdateSchema = PartSchema.partial({
    name: true,
    barcode: true,
    price: true,
    stock: true,
    imageUrl: true,
}).omit({ brandId: true, id: true }).and(PartFindByIdSchema);

export const PartSortSchema = z.object({
    field: PartSchema.omit({ brandId: true, imageUrl: true }).keyof().optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const PartFilterSchema = z.object({ sort: PartSortSchema }).and(FilterSchema);

export const PartManagerVehicleSchema = z.object({
    id: z.number().int().or(z.string().transform((val) => parseInt(val))),
    vehicleId: z.number().int().or(z.string().transform((val) => parseInt(val)))
});