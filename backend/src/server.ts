import express from 'express';
import cors from 'cors';

import { LogMiddleware } from './middlewares/log';
import brandRouter from './routes/brand';
import vehicleRouter from './routes/vehicle';
import partRouter from './routes/part';

const app = express();

app.use(express.json());
app.use(cors())

app.use(LogMiddleware.handle);

app.use('/brand', brandRouter);
app.use('/vehicle', vehicleRouter);
app.use('/part', partRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.listen(3030, () => {
    console.log('Server running on port 3030');
})