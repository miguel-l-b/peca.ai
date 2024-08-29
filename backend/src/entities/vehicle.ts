import { z } from 'zod';

export const VehicleSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    year: z.number(),
    vehicleType: z.string(),
    fabricatedAt: z.date(),
    brandId: z.number().positive(),
    imageUrl: z.string().url(),
});

export type TVehicle = z.infer<typeof VehicleSchema>;

export const VehicleCreateSchema = VehicleSchema.omit({ id: true });
export type TVehicleCreate = z.infer<typeof VehicleCreateSchema>;

export const VehicleUpdateSchema = VehicleSchema.partial({
    name: true,
    year: true,
    fabricatedAt: true,
    imageUrl: true,
}).omit({ brandId: true });
export type TVehicleUpdate = z.infer<typeof VehicleUpdateSchema>;

export const VehicleSortSchema = z.object({
    field: VehicleSchema.omit({ brandId: true, imageUrl: true }).keyof(),
    order: z.enum(['asc', 'desc']),
});
export type TVehicleSort = z.infer<typeof VehicleSortSchema>;