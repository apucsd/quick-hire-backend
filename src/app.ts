import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import path from 'path';
import { Morgan } from './app/shared/morgan';
import rateLimiter from './app/middlewares/rateLimiter';
import config from './config';
const app: Application = express();

app.use(rateLimiter);

app.use(
    cors({
        origin: ['http://localhost:3001', 'https://quick-hire-liard.vercel.app', 'http://localhost:5173'],
        credentials: true,
    })
);
//  ============ LOGGER MIDDLEWARE ============
// app.use(Morgan.errorHandler);
// app.use(Morgan.successHandler);

//  ============ PARSER MIDDLEWARE ============
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

//  ============ ROUTER MIDDLEWARE ============
app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'active',
        message: `${config.app_name} server is active and operational.`,
        timestamp: new Date().toISOString(),
    });
});

app.use('/api/v1', router);

//  ============ ERROR MIDDLEWARE ============
app.use(globalErrorHandler);
app.use('/upload', express.static(path.join(__dirname, 'app', 'upload')));
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'API NOT FOUND!',
        error: {
            path: req.originalUrl,
            message: 'Your requested path is not found!',
        },
    });
});

export default app;
