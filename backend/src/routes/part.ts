import { Router } from 'express';
import PartController from '../controllers/part';
import { PartCreateSchema, PartFilterSchema, PartFindByIdSchema, PartManagerVehicleSchema, PartUpdateSchema } from 'entities';

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
    const { sort, order, page, limit } = req.query;

    const reqObject = PartFilterSchema.safeParse({ sort: { field: sort, order }, page, limit });
    if (reqObject.success) {
        const parts = await PartController.getParts(reqObject.data);
        return res.json(parts);
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.get('/find/:id', async (req, res) => {
    const reqObject = PartFindByIdSchema.safeParse(req.params);
    if (reqObject.success) {
        const part = await PartController.getPartById(reqObject.data);
        if (part)
            return res.json(part);

        return res.status(404).json({ message: 'Part not found' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.get('/:id/vehicles', async (req, res) => {
    const reqObject = PartFindByIdSchema.safeParse(req.params);
    if (reqObject.success) {
        const part = await PartController.getVehiclesById(reqObject.data);
        if (part)
            return res.json(part);

        return res.status(404).json({ message: 'Part not found' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.put("/:id/vehicles/add/:vehicleId", async (req, res) => {
    const reqObject = PartManagerVehicleSchema.safeParse(req.params);
    if (reqObject.success) {
        const part = await PartController.addVehicleToPart(reqObject.data);
        if (part)
            return res.json(part);

        return res.status(404).json({ message: 'Part not found' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

partRouter.put("/:id/vehicles/remove/:vehicleId", async (req, res) => {
    const reqObject = PartManagerVehicleSchema.safeParse(req.params);
    if (reqObject.success) {
        const part = await PartController.removeVehicleFromPart(reqObject.data);
        if (part)
            return res.json(part);

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