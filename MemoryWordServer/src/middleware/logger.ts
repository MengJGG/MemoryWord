import { Request, Response, NextFunction } from 'express';


// 打印请求日志
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
}