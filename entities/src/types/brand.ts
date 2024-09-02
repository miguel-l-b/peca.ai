import { z } from 'zod';
import {
    BrandCreateSchema, BrandFilterSchema, BrandFindByIdSchema, BrandSchema,
    BrandSortSchema, BrandUpdateSchema
} from '../schemas';

export type TBrand = z.infer<typeof BrandSchema>;
export type TBrandFindById = z.infer<typeof BrandFindByIdSchema>;
export type TBrandSort = z.infer<typeof BrandSortSchema>;
export type TBrandFilter = z.infer<typeof BrandFilterSchema>;
export type TBrandCreate = z.infer<typeof BrandCreateSchema>;
export type TBrandUpdate = z.infer<typeof BrandUpdateSchema>;