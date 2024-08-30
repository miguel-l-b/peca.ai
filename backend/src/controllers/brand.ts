import { PrismaClient } from "@prisma/client";
import { BrandCreateSchema, BrandFilterSchema, BrandFindByIdSchema, BrandUpdateSchema, TBrand, TBrandCreate, TBrandFilter, TBrandFindById, TBrandUpdate } from "../entities/brand";
import CountryController from "./country";

const db = new PrismaClient();

export default class BrandController {
    public static async createBrand(brand: TBrandCreate): Promise<boolean> {
        if (!BrandCreateSchema.safeParse(brand).success)
            return false;

        const brandExists = await db.brand.findFirst({ where: { name: brand.name, deleted: false } });
        if (brandExists)
            return false;

        const countryId = await CountryController.getCountryOrCreate(brand.country);
        if (!countryId)
            return false;

        return await db.brand.create({
            data: {
                name: brand.name,
                imageUrl: brand.imageUrl,
                countryId: countryId,
                foundedAt: brand.foundedAt,
            }
        })
            .then(() => true)
            .catch(() => false);
    }

    public static async getBrandById(BrandId: TBrandFindById) {
        if (!BrandFindByIdSchema.safeParse(BrandId).success)
            return null;

        return await db.brand.findUnique({ where: { id: BrandId.id, deleted: false }, include: { Vehicle: true, Part: true, country: true } });
    }

    public static async getBrands(filter: TBrandFilter) {
        if (!BrandFilterSchema.safeParse(filter).success)
            return null;

        return await db.brand.findMany({
            where: { deleted: false, country: { deleted: false } },
            include: { country: true },
            orderBy: { [filter.sort.field]: filter.sort.order },
            skip: filter.skip,
            take: filter.offset
        });
    }

    public static async updateBrand(brand: TBrandUpdate): Promise<boolean> {
        if (!BrandUpdateSchema.safeParse(brand).success)
            return false;

        return await db.brand.update({
            where: { id: brand.id, deleted: false },
            data: {
                name: brand.name,
                imageUrl: brand.imageUrl,
                foundedAt: brand.foundedAt,
            }
        })
            .then(() => true)
            .catch(() => false);
    }
}