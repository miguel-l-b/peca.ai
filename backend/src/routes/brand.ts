import { Router } from 'express';

const brandRouter = Router();

brandRouter.get('/', (req, res) => {
    res.send('Hello from brand router');
});

export default brandRouter;