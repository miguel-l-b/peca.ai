import { Request, Response, NextFunction } from 'express';

export class LogMiddleware {
    public static handle(req: Request, res: Response, next: NextFunction) {
        const date = new Date().toLocaleString();
        console.time(`[${date}] (${req.method}) - ${req.path} finished in`);
        next();
        console.timeEnd(`[${date}] (${req.method}) - ${req.path} finished in`);
    }
}