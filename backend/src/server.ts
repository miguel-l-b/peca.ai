import express from 'express';
import { LogMiddleware } from './middlewares/log';
import brandRouter from './routes/brand';
import vehicleRouter from './routes/vehicle';

const app = express();

app.use(express.json());

app.use(LogMiddleware.handle);

app.use('/brand', brandRouter);
app.use('/vehicle', vehicleRouter);

app.listen(3030, () => {
    console.log('Server running on port 3030');
})