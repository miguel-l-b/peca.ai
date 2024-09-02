import { z } from 'zod';
import { FilterSchema } from './filter';

export const BrandSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    imageUrl: z.string().url(),
    country: z.string(),
    foundedAt: z.date().or(z.string().date().transform((val) => new Date(val))).or(z.string()),
});

export const BrandFindByIdSchema = z.object({ id: z.string().transform((val) => parseInt(val)) }).or(BrandSchema.pick({ id: true }));

export const BrandSortSchema = z.object({
    field: BrandSchema.keyof().optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const BrandFilterSchema = z.object({ sort: BrandSortSchema }).and(FilterSchema);

export const BrandCreateSchema = BrandSchema.omit({ id: true });

export const BrandUpdateSchema = BrandSchema.partial({
    name: true,
    imageUrl: true,
    country: true,
    foundedAt: true,
}).omit({ id: true }).and(BrandFindByIdSchema);