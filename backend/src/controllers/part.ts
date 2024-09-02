import { PrismaClient } from '@prisma/client';

import {
    PartCreateSchema, PartFilterSchema, PartFindByIdSchema,
    PartManagerVehicleSchema, PartUpdateSchema
} from 'entities';
import {
    TPartCreate, TPartFilter, TPartFindById, TPartManagerVehicle, TPartUpdate
} from 'entities';

const db = new PrismaClient();

export default class PartController {
    public static async removeVehicleFromPart(vehicleRemove: TPartManagerVehicle) {
        if (!PartManagerVehicleSchema.safeParse(vehicleRemove).success)
            return null;


        if ((await db.partVehicle.findMany({ where: { partId: vehicleRemove.id, vehicleId: vehicleRemove.vehicleId, deleted: false } })).length === 0)
            return null;

        return await db.partVehicle.updateMany({ where: { partId: vehicleRemove.id, vehicleId: vehicleRemove.vehicleId }, data: { deleted: true, deletedAt: new Date() } })
            .then(() => true)
            .catch(() => false);
    }

    public static async addVehicleToPart(vehicleAdd: TPartManagerVehicle) {
        if (!PartManagerVehicleSchema.safeParse(vehicleAdd).success)
            return null;

        if ((await db.partVehicle.findMany({ where: { partId: vehicleAdd.id, vehicleId: vehicleAdd.vehicleId, deleted: false } })).length > 0)
            return null;

        if (await db.part.findUnique({ where: { id: vehicleAdd.id, deleted: false } }) === null)
            return null;

        if (await db.vehicle.findUnique({ where: { id: vehicleAdd.vehicleId, deleted: false } }) === null)
            return null;

        return await db.partVehicle.create({
            data: {
                partId: vehicleAdd.id,
                vehicleId: vehicleAdd.vehicleId
            }
        })
            .then(() => true)
            .catch(() => false);
    }

    public static async createPart(part: TPartCreate): Promise<boolean> {
        if (!PartCreateSchema.safeParse(part).success)
            return false;

        return await db.part.create({
            data: {
                name: part.name,
                barcode: part.barcode,
                price: part.price,
                brandId: part.brandId,
                imageUrl: part.imageUrl,
            }
        })
            .then(() => true)
            .catch((e) => {
                console.error(e);
                return false;
            });
    }

    public static async getPartById(PartId: TPartFindById) {
        if (!PartFindByIdSchema.safeParse(PartId).success)
            return null;

        return await db.part.findUnique({ where: { id: PartId.id, deleted: false }, include: { brand: true } });
    }

    public static async getVehiclesById(PartId: TPartFindById) {
        if (!PartFindByIdSchema.safeParse(PartId).success)
            return null;

        const part = await db.part.findUnique({ where: { id: PartId.id, deleted: false } });
        if (!part || part.deleted)
            return null;

        return await db.partVehicle.findMany({
            where: { partId: PartId.id, vehicle: { deleted: false }, deleted: false },
            select: {
                vehicle: {
                    include: {
                        brand: {
                            include: { country: true }
                        }
                    }
                }
            }
        });
    }

    public static async getParts(settings: TPartFilter) {
        if (!PartFilterSchema.safeParse(settings).success)
            return null;

        return await db.part.findMany({
            include: { brand: true },
            where: { deleted: false },
            orderBy: { [settings.sort.field]: settings.sort.order },
            skip: settings.page * settings.per_page - settings.per_page,
            take: settings.per_page
        });
    }

    public static async updatePart(part: TPartUpdate): Promise<boolean> {
        if (!PartUpdateSchema.safeParse(part).success)
            return false;

        return await db.part.update({
            where: { id: part.id },
            data: {
                name: part.name,
                barcode: part.barcode,
                price: part.price,
                imageUrl: part.imageUrl,
            }
        })
            .then(() => true)
            .catch(() => false);
    }

    public static async deletePart(partId: TPartFindById): Promise<boolean> {
        return await db.part.update({ where: { id: partId.id }, data: { deleted: true, deletedAt: new Date() } })
            .then(() => true)
            .catch(() => false);
    }
}