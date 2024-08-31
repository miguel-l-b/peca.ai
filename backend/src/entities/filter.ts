import { z } from 'zod';

const FilterSchema = z.object({
    page: z.number().int().positive().min(1).or(z.string().transform((skip) => parseInt(skip))).optional().default(1),
    limit: z.number().int().positive().min(1).max(100).or(z.string().transform((skip) => parseInt(skip))).optional().default(20),
});

export default FilterSchema