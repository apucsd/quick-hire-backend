import { ZodError, ZodIssue } from 'zod';
import { TErrorDetails, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorDetails: TErrorDetails = {
        issues: err.issues.map((issue: ZodIssue) => {
            const fieldPath = issue.path.join('.');
            return {
                path: fieldPath,
                message: issue.message,
            };
        }),
    };

    const mainMessage = err.issues
        .slice(0, 2)
        .map((issue) => {
            // const field = issue.path.filter((p) => typeof p === 'string').pop() || 'Field';
            return `${issue.message}`;
        })
        .join('. ');

    const message = err.issues.length > 2 ? `${mainMessage}...` : mainMessage;
    const statusCode = 400;

    return {
        statusCode,
        message,
        errorDetails,
    };
};

export default handleZodError;
