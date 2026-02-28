import { Request, Response } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import { errorLogger, logger } from './logger';
import config from '../../config';

morgan.token('message', (req: Request, res: Response) => res?.locals.errorMessage || '');

// Custom colored method token
morgan.token('method', (req: Request) => {
    const method = req.method;
    switch (method) {
        case 'GET':
            return chalk.green.bold(method);
        case 'POST':
            return chalk.yellow.bold(method);
        case 'PUT':
            return chalk.blue.bold(method);
        case 'DELETE':
            return chalk.red.bold(method);
        case 'PATCH':
            return chalk.cyan.bold(method);
        default:
            return chalk.white.bold(method);
    }
});

// Custom colored status token
morgan.token('status', (req: Request, res: Response) => {
    const status = res.statusCode;
    const color =
        status >= 500
            ? chalk.red.bold
            : status >= 400
              ? chalk.yellow.bold
              : status >= 300
                ? chalk.cyan.bold
                : chalk.green.bold;
    return color(status.toString());
});

const getIpFormat = () => (config.env === 'development' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;

const successHandler = morgan(successResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode >= 400,
    stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode < 400,
    stream: { write: (message: string) => errorLogger.error(message.trim()) },
});

export const Morgan = { errorHandler, successHandler };
