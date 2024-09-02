import { z } from 'zod';
import { FilterSchema } from './filter';

export const VehicleSchema = z.object({
    id: z.number().positive().or(z.string().transform((val) => parseInt(val))),
    name: z.string(),
    year: z.number(),
    vehicleType: z.string(),
    brandId: z.number().positive(),
    imageUrl: z.string().url(),
});

export const VehicleCreateSchema = VehicleSchema.omit({ id: true });

export const VehicleUpdateSchema = VehicleSchema.partial({
    name: true,
    year: true,
    imageUrl: true,
    vehicleType: true,
}).omit({ brandId: true });

export const VehicleSortSchema = z.object({
    field: VehicleSchema.omit({ brandId: true, imageUrl: true }).keyof().optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const VehicleFilterSchema = z.object({ sort: VehicleSortSchema }).and(FilterSchema);

export const VehicleFindByIdSchema = z.object({ id: z.string().transform((val) => parseInt(val)) }).or(VehicleSchema.pick({ id: true }));