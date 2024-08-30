import { Request, Response, NextFunction } from 'express';

export class LogMiddleware {
    public static handle(req: Request, res: Response, next: NextFunction) {
        const date = new Date()
        next();
        console.log(`[${date}] (${req.method}) - ${req.path} finished in: ${Date.now() - date.getTime()}ms`);
    }
}