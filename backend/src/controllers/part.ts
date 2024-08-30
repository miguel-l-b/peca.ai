import { PrismaClient } from "@prisma/client";
import { PartCreateSchema, PartFilterSchema, PartFindByIdSchema, PartSortSchema, PartUpdateSchema, TPartCreate, TPartFilter, TPartFindById, TPartSort, TPartUpdate } from "../entities/part";

const db = new PrismaClient();

export default class PartController {
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

        return await db.vehicle.findMany({ where: { PartVehicle: { every: { partId: PartId.id, AND: { vehicle: { deleted: false } } } } } });
    }

    public static async getParts(settings: TPartFilter) {
        if (!PartFilterSchema.safeParse(settings).success)
            return null;

        return await db.part.findMany({
            include: { brand: true },
            where: { deleted: false },
            orderBy: { [settings.sort.field]: settings.sort.order },
            skip: settings.skip,
            take: settings.offset
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