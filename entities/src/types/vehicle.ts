import { z } from 'zod';
import {
    VehicleCreateSchema, VehicleFilterSchema, VehicleFindByIdSchema,
    VehicleSchema, VehicleSortSchema, VehicleUpdateSchema
} from '../schemas';
import { TBrand, TPart } from '.';

export type TVehicle = z.infer<typeof VehicleSchema>;
export type TVehicleCreate = z.infer<typeof VehicleCreateSchema>;
export type TVehicleUpdate = z.infer<typeof VehicleUpdateSchema>;
export type TVehicleSort = z.infer<typeof VehicleSortSchema>;
export type TVehicleFilter = z.infer<typeof VehicleFilterSchema>;
export type TVehicleFindById = z.infer<typeof VehicleFindByIdSchema>;
export type TVehiclePopulate = TVehicle & { brand?: TBrand }
export type TVehicleList = {
    items: TVehiclePopulate[];
    total: number;
    pages: number;
}