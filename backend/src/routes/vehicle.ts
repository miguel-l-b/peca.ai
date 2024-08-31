import { Router } from 'express';
import { VehicleCreateSchema, VehicleFilterSchema, VehicleFindByIdSchema, VehicleSchema, VehicleUpdateSchema } from '../entities/vehicle';
import VehicleController from '../controllers/vehicle';
import BigIntHelper from '../helpers/bigint';

const vehicleRouter = Router();

vehicleRouter.post('/create', async (req, res) => {
    const reqObject = VehicleCreateSchema.safeParse(req.body);

    if (reqObject.success) {
        if (await VehicleController.createVehicle(reqObject.data))
            return res.status(201).json({ message: 'Vehicle created' });

        return res.status(500).json({ message: 'Error creating vehicle' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

vehicleRouter.get('/find', async (req, res) => {
    const { sort, order, page, limit } = req.query;

    const reqObject = VehicleFilterSchema.safeParse({ sort: { field: sort, order }, page, limit });
    if (reqObject.success) {
        const vehicles = await VehicleController.getVehicles(reqObject.data);
        return res.json(vehicles?.map(BigIntHelper.convertBigIntToString));
    }

    return res.status(400).json({ message: 'Invalid data' });
});

vehicleRouter.get('/find/:id', async (req, res) => {
    const reqObject = VehicleFindByIdSchema.safeParse(req.params);

    if (reqObject.success) {
        const vehicle = await VehicleController.getVehicleById(reqObject.data);
        if (vehicle)
            return res.json(BigIntHelper.convertBigIntToString(vehicle));

        return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

vehicleRouter.get('/:id/parts', async (req, res) => {
    const reqObject = VehicleFindByIdSchema.safeParse(req.params);

    if (reqObject.success) {
        const parts = await VehicleController.getPartsByVehicleId(reqObject.data);
        return res.json(parts?.map(BigIntHelper.convertBigIntToString));
    }

    return res.status(400).json({ message: 'Invalid data' });
});

vehicleRouter.put('/update/:id', async (req, res) => {
    const reqObject = VehicleUpdateSchema.safeParse({ ...req.body, id: req.params.id });

    if (reqObject.success) {
        if (await VehicleController.updateVehicle(reqObject.data))
            return res.json({ message: 'Vehicle updated' });

        if (await VehicleController.getVehicleById(reqObject.data) === null)
            return res.status(404).json({ message: 'Vehicle not found' });

        return res.status(500).json({ message: 'Error updating vehicle' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

vehicleRouter.delete('/delete/:id', async (req, res) => {
    const reqObject = VehicleFindByIdSchema.safeParse(req.params);

    if (reqObject.success) {
        if (await VehicleController.deleteVehicle(reqObject.data))
            return res.json({ message: 'Vehicle deleted' });

        if (await VehicleController.getVehicleById(reqObject.data) === null)
            return res.status(404).json({ message: 'Vehicle not found' });

        return res.status(500).json({ message: 'Error deleting vehicle' });
    }

    return res.status(400).json({ message: 'Invalid data' });
});

export default vehicleRouter;