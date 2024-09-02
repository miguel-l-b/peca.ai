import { z } from 'zod';

export const FilterSchema = z.object({
    page: z.number().int().positive().min(1).or(z.string().transform((skip) => parseInt(skip))).optional().default(1),
    per_page: z.number().int().positive().min(1).max(100).or(z.string().transform((skip) => parseInt(skip))).optional().default(5),
});