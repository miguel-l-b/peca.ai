import { PrismaClient } from "@prisma/client";
import { PartCreateSchema, PartSortSchema, PartUpdateSchema, TPartCreate, TPartSort, TPartUpdate } from "../entities/part";

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
            .catch(() => false);
    }

    public static async getPartById(id: number) {
        return await db.part.findUnique({ where: { id }, include: { brand: true } });
    }

    public static async getParts(settings: { sort: TPartSort, skip?: number, offset?: number }) {
        if (!PartSortSchema.safeParse(settings.sort).success)
            return null;

        return await db.part.findMany({
            include: { brand: true },
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

    public static async deletePart(id: number): Promise<boolean> {
        return await db.part.update({ where: { id }, data: { deleted: true, deletedAt: new Date() } })
            .then(() => true)
            .catch(() => false);
    }
}