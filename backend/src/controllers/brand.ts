import { PrismaClient } from '@prisma/client';

import CountryController from './country';
import {
    BrandCreateSchema, BrandFilterSchema, BrandFindByIdSchema, BrandUpdateSchema
} from 'entities';
import {
    TBrandCreate, TBrandFindById, TBrandFilter, TBrandUpdate
} from 'entities';

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

        return await db.brand.findUnique({ where: { id: BrandId.id, deleted: false }, include: { Vehicle: { where: { deleted: false } }, Part: { where: { deleted: false } }, country: true } });
    }

    public static async getBrands(settings: TBrandFilter) {
        if (!BrandFilterSchema.safeParse(settings).success)
            return null;

        return await db.brand.findMany({
            where: { deleted: false, country: { deleted: false } },
            include: { country: true },
            orderBy: { [settings.sort.field]: settings.sort.order },
            skip: settings.page * settings.per_page - settings.per_page,
            take: settings.per_page
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