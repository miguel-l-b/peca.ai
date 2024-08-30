import { Router } from 'express';
import PartController from '../controllers/part';
import { PartCreateSchema, PartFilterSchema, PartFindByIdSchema, PartUpdateSchema } from '../entities/part';
import BigIntHelper from '../helpers/bigint';

const partRouter = Router();

partRouter.post('/create', async (req, res) => {
    const reqObject = PartCreateSchema.safeParse(req.body);
    if (reqObject.success) {
        if (await PartController.createPart(reqObject.data))
            return res.status(201).json({ message: 'Part created' });

        return res.status(500).json({ message: 'Error creating part' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.get('/find', async (req, res) => {
    const { sort, order, skip, offset } = req.query;

    const reqObject = PartFilterSchema.safeParse({ sort: { field: sort, order }, skip, offset });
    if (reqObject.success) {
        const parts = await PartController.getParts(reqObject.data);
        return res.json(parts?.map(BigIntHelper.convertBigIntToString));
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.get('/find/:id', async (req, res) => {
    const reqObject = PartFindByIdSchema.safeParse(req.params);
    if (reqObject.success) {
        const part = await PartController.getPartById(reqObject.data);
        if (part)
            return res.json(BigIntHelper.convertBigIntToString(part));

        return res.status(404).json({ message: 'Part not found' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.get('/:id/vehicles', async (req, res) => {
    const reqObject = PartFindByIdSchema.safeParse(req.params);
    if (reqObject.success) {
        const part = await PartController.getVehiclesById(reqObject.data);
        if (part)
            return res.json(part.map(BigIntHelper.convertBigIntToString));

        return res.status(404).json({ message: 'Part not found' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.put('/update/:id', async (req, res) => {
    const reqObject = PartUpdateSchema.safeParse({ ...req.body, id: req.params.id });
    if (reqObject.success) {
        if (await PartController.updatePart(reqObject.data))
            return res.json({ message: 'Part updated' });

        if (await PartController.getPartById(reqObject.data) === null)
            return res.status(404).json({ message: 'Part not found' });

        return res.status(500).json({ message: 'Error updating part' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.delete('/delete/:id', async (req, res) => {
    const reqObject = PartFindByIdSchema.safeParse(req.params);
    if (reqObject.success) {
        if (await PartController.deletePart(reqObject.data))
            return res.json({ message: 'Part deleted' });

        if (await PartController.getPartById(reqObject.data) === null)
            return res.status(404).json({ message: 'Part not found' });

        return res.status(500).json({ message: 'Error deleting part' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

export default partRouter;