import { PrismaClient } from "@prisma/client";
import { BrandCreateSchema, BrandUpdateSchema, TBrand, TBrandCreate, TBrandUpdate } from "../entities/brand";
import CountryController from "./country";

const db = new PrismaClient();

export default class BrandController {
    public static async createBrand(brand: TBrandCreate): Promise<boolean> {
        if (!BrandCreateSchema.safeParse(brand).success)
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

    public static async getBrandById(id: number) {
        return await db.brand.findUnique({ where: { id }, include: { Vehicle: true, Part: true, country: true } });
    }

    public static async updateBrand(brand: TBrandUpdate): Promise<boolean> {
        if (!BrandUpdateSchema.safeParse(brand).success)
            return false;

        return await db.brand.update({
            where: { id: brand.id },
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