import { Router } from 'express';

import BrandController from '../controllers/brand';
import {
    BrandCreateSchema, BrandFilterSchema, BrandFindByIdSchema, BrandUpdateSchema
} from 'entities';

const brandRouter = Router();

brandRouter.post('/create', async (req, res) => {
    const reqObject = BrandCreateSchema.safeParse(req.body);
    if (reqObject.success) {
        if (await BrandController.createBrand(reqObject.data))
            return res.json({ message: 'Brand created' });

        return res.status(500).json({ message: 'Error creating brand' });
    }

    return res.status(400).json({ message: 'Invalid data' });
}
);

brandRouter.get('/find', async (req, res) => {
    const { sort, order, page, limit } = req.query;

    const reqObject = BrandFilterSchema.safeParse({ sort: { field: sort, order }, page, limit });
    if (reqObject.success) {
        const brands = await BrandController.getBrands(reqObject.data);
        if (brands === null)
            return res.status(404).json({ message: 'Brand not found' });

        return res.json(brands);

    }

    return res.status(400).json({ message: 'Invalid data' });
});

brandRouter.get('/find/:id', async (req, res) => {
    const reqObject = BrandFindByIdSchema.safeParse(req.params);
    if (reqObject.success) {
        const brand = await BrandController.getBrandById(reqObject.data);
        if (brand)
            return res.json(brand);

        return res.status(404).json({ message: 'Brand not found' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

brandRouter.put('/update/:id', async (req, res) => {
    const reqObject = BrandUpdateSchema.safeParse({ ...req.body, id: req.params.id });
    if (reqObject.success) {
        if (await BrandController.updateBrand(reqObject.data))
            return res.json({ message: 'Brand updated' });

        if (await BrandController.getBrandById(reqObject.data) === null)
            return res.status(404).json({ message: 'Brand not found' });

        return res.status(500).json({ message: 'Error updating brand' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

export default brandRouter;