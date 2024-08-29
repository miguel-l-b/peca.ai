import { z } from 'zod';
import { BrandSchema } from './brand';

export const PartSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    barcode: z.string(),
    price: z.number(),
    stock: z.number().optional(),
    brandId: z.number().positive(),
    imageUrl: z.string().url(),
});
export type TPart = z.infer<typeof PartSchema>;

export const PartCreateSchema = PartSchema.omit({ id: true, stock: true });
export type TPartCreate = z.infer<typeof PartCreateSchema>;

export const PartUpdateSchema = PartSchema.partial({
    name: true,
    barcode: true,
    price: true,
    stock: true,
    imageUrl: true,
}).omit({ brandId: true });
export type TPartUpdate = z.infer<typeof PartUpdateSchema>;

export const PartSortSchema = z.object({
    field: PartSchema.omit({ brandId: true, imageUrl: true }).keyof(),
    order: z.enum(['asc', 'desc']),
});
export type TPartSort = z.infer<typeof PartSortSchema>;