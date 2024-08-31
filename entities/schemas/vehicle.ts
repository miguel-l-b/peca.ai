import { z } from 'zod';
import FilterSchema from './filter';
import { BrandSchema } from 'entities';

export const VehicleSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    year: z.number(),
    vehicleType: z.string(),
    brandId: z.number().positive(),
    brand: BrandSchema.optional(),
    imageUrl: z.string().url(),
});

export type TVehicle = z.infer<typeof VehicleSchema>;

export const VehicleCreateSchema = VehicleSchema.omit({ id: true });
export type TVehicleCreate = z.infer<typeof VehicleCreateSchema>;

export const VehicleUpdateSchema = VehicleSchema.partial({
    name: true,
    year: true,
    imageUrl: true,
}).omit({ brandId: true });
export type TVehicleUpdate = z.infer<typeof VehicleUpdateSchema>;

export const VehicleSortSchema = z.object({
    field: VehicleSchema.omit({ brandId: true, imageUrl: true }).keyof().optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
});
export type TVehicleSort = z.infer<typeof VehicleSortSchema>;
export const VehicleFilterSchema = z.object({ sort: VehicleSortSchema }).and(FilterSchema);
export type TVehicleFilter = z.infer<typeof VehicleFilterSchema>;

export const VehicleFindByIdSchema = z.object({ id: z.string().transform((val) => parseInt(val)) }).or(VehicleSchema.pick({ id: true }));
export type TVehicleFindById = z.infer<typeof VehicleFindByIdSchema>;