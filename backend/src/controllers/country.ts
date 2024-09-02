import { PrismaClient } from '@prisma/client';

import { TCountry } from 'entities';

const db = new PrismaClient();

export default class CountryController {
    public static async createCountry(name: string): Promise<number | null> {
        return await db.country.create({ data: { name } })
            .then((country) => {
                return country.id;
            })
            .catch(() => {
                return null;
            });
    }

    public static async getCountryOrCreate(name: string): Promise<number | null> {
        let country = await this.getCountryByName(name);
        if (country)
            return country.id;

        return await this.createCountry(name);
    }

    public static async getCountryByName(name: string): Promise<TCountry | null> {
        return await db.country.findFirst({ where: { name } });
    }

    public static async getCountryById(id: number): Promise<TCountry | null> {
        return await db.country.findUnique({ where: { id } });
    }
}