import { Router } from 'express';

const vehicleRouter = Router();

vehicleRouter.get('/', (req, res) => {
    res.send('Hello from vehicle router');
});

export default vehicleRouter;