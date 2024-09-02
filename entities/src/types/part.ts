import { z } from 'zod';
import {
    PartCreateSchema, PartFilterSchema, PartFindByIdSchema,
    PartManagerVehicleSchema, PartSchema, PartSortSchema, PartUpdateSchema
} from '../schemas';
import { TBrand } from '.';

export type TPart = z.infer<typeof PartSchema>;
export type TPartCreate = z.infer<typeof PartCreateSchema>;
export type TPartFindById = z.infer<typeof PartFindByIdSchema>;
export type TPartUpdate = z.infer<typeof PartUpdateSchema>;
export type TPartSort = z.infer<typeof PartSortSchema>;
export type TPartFilter = z.infer<typeof PartFilterSchema>;
export type TPartManagerVehicle = z.infer<typeof PartManagerVehicleSchema>;
export type TPartPopulate = TPart & { brand?: TBrand }