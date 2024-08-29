import { PrismaClient } from "@prisma/client";
import { TVehicleCreate, TVehicleSort, TVehicleUpdate, VehicleCreateSchema, VehicleUpdateSchema } from "../entities/vehicle";

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
        if (!vehicleTypeId)
            return false;

        return await db.vehicle.create({
            data: {
                name: vehicle.name,
                year: vehicle.year,
                vehicleTypeId: vehicleTypeId,
                fabricatedAt: vehicle.fabricatedAt,
                imageUrl: vehicle.imageUrl,
                brandId: vehicle.brandId,
            }
        })
            .then(() => true)
            .catch(() => false);
    }

    public static async getVehicleById(id: number) {
        return await db.vehicle.findUnique({ where: { id }, include: { brand: true, vehicleType: true } });
    }

    public static async getVehicles(settings: { sort: TVehicleSort, skip?: number, offset?: number }) {
        return await db.vehicle.findMany({
            include: { brand: true, vehicleType: true },
            orderBy: { [settings.sort.field]: settings.sort.order },
            skip: settings.skip,
            take: settings.offset
        });
    }

    public static async updateVehicle(vehicle: TVehicleUpdate): Promise<boolean> {
        if (!VehicleUpdateSchema.safeParse(vehicle).success)
            return false;

        return await db.vehicle.update({
            where: { id: vehicle.id },
            data: {
                name: vehicle.name,
                year: vehicle.year,
                fabricatedAt: vehicle.fabricatedAt,
                imageUrl: vehicle.imageUrl,
            }
        })
            .then(() => true)
            .catch(() => false);
    }

    public static async deleteVehicle(id: number): Promise<boolean> {
        return await db.vehicle.update({ where: { id }, data: { deleted: true, deletedAt: new Date() } })
            .then(() => true)
            .catch(() => false);
    }
}