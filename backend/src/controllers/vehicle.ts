import { PrismaClient } from '@prisma/client';

import {
    VehicleCreateSchema, VehicleFilterSchema, VehicleFindByIdSchema,
    VehicleUpdateSchema
} from 'entities';
import {
    TVehicleCreate, TVehicleFilter, TVehicleFindById, TVehicleUpdate
} from 'entities';

const db = new PrismaClient();

export default class VehicleController {
    //#region methods private
    private static async createVehicleType(name: string): Promise<number | null> {
        return await db.vehicleType.create({ data: { name } })
            .then((vehicleType) => {
                return vehicleType.id;
            })
            .catch(() => {
                return null;
            });
    }

    private static async getVehicleTypeByName(name: string): Promise<number | null> {
        return await db.vehicleType.findFirst({ where: { name }, select: { id: true } })
            .then((vehicleType) => vehicleType?.id ?? null)
            .catch(() => null);
    }

    private static async getVehicleTypeOrCreate(name: string): Promise<number | null> {
        let vehicleType = await this.getVehicleTypeByName(name);
        if (vehicleType)
            return vehicleType;

        return await this.createVehicleType(name);
    }
    //#endregion methods private

    public static async createVehicle(vehicle: TVehicleCreate): Promise<boolean> {
        if (!VehicleCreateSchema.safeParse(vehicle).success)
            return false;

        const vehicleTypeId = await this.getVehicleTypeOrCreate(vehicle.vehicleType);
        if (vehicleTypeId === null)
            return false;

        const existVehicle = await db.vehicle.findFirst({ where: { name: vehicle.name, year: vehicle.year, deleted: false } });
        if (existVehicle !== null)
            return false;

        return await db.vehicle.create({
            data: {
                name: vehicle.name,
                year: vehicle.year,
                vehicleTypeId: vehicleTypeId,
                imageUrl: vehicle.imageUrl,
                brandId: vehicle.brandId,
            }
        })
            .then(() => true)
            .catch((e) => false);
    }

    public static async getVehicleById(vehicleId: TVehicleFindById) {
        if (!VehicleFindByIdSchema.safeParse(vehicleId).success)
            return null;

        if (await db.vehicle.findFirst({ where: { id: vehicleId.id, deleted: false } }) === null)
            return null;

        return await db.vehicle.findUnique({ where: { id: vehicleId.id }, include: { brand: true, vehicleType: true } })
            .then(v => {
                const type = v?.vehicleType.name;
                return {
                    ...v,
                    vehicleType: type
                };
            });
    }

    public static async getVehicles(settings: TVehicleFilter) {
        if (!VehicleFilterSchema.safeParse(settings).success)
            return null;

        const count = await db.vehicle.findMany({
            where: { deleted: false },
            select: { id: true },
        })
            .then(vehicles => {
                return vehicles.length;
            })
            .catch(() => 0);

        return await db.vehicle.findMany({
            where: { deleted: false },
            include: { brand: true, vehicleType: true },
            orderBy: { [settings.sort.field]: settings.sort.order },
            skip: (settings.page - 1) * settings.per_page,
            take: settings.per_page,
        })
            .then(vehicles => {
                const items = vehicles.map(v => {
                    const type = v.vehicleType.name;
                    return {
                        ...v,
                        vehicleType: type
                    };
                });
                return {
                    items,
                    total: count,
                    pages: Math.ceil(count / settings.per_page),
                }
            });
    }

    public static async getPartsByVehicleId(vehicleId: TVehicleFindById) {
        if (!VehicleFindByIdSchema.safeParse(vehicleId).success)
            return null;


        if (await db.vehicle.findFirst({ where: { id: vehicleId.id, deleted: false } }) === null)
            return null;

        return await db.part.findMany({
            where: { PartVehicle: { some: { vehicleId: vehicleId.id } }, deleted: false },
            include: { brand: true }
        });
    }

    public static async updateVehicle(vehicle: TVehicleUpdate): Promise<boolean> {
        if (!VehicleUpdateSchema.safeParse(vehicle).success)
            return false;

        if (await db.vehicle.findFirst({ where: { id: vehicle.id, deleted: false } }) === null)
            return false;

        return await db.vehicle.update({
            where: { id: vehicle.id },
            data: {
                name: vehicle.name,
                year: vehicle.year,
                imageUrl: vehicle.imageUrl,
            }
        })
            .then(() => true)
            .catch(() => false);
    }

    public static async deleteVehicle(vehicleId: TVehicleFindById): Promise<boolean> {
        if (!VehicleFindByIdSchema.safeParse(vehicleId).success)
            return false;

        return await db.vehicle.update({ where: { id: vehicleId.id }, data: { deleted: true, deletedAt: new Date() } })
            .then(() => true)
            .catch((e) => false);
    }
}