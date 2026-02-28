import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ApplicationService } from './application.service';

const createApplication = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationService.createApplicationIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Application submitted successfully',
        data: result,
    });
});

const getApplicationsByJobId = catchAsync(
    async (req: Request, res: Response) => {
        const result = await ApplicationService.getApplicationsByJobIdFromDB(
            req.params.jobId,
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Applications fetched successfully',
            data: result,
        });
    },
);

export const ApplicationController = {
    createApplication,
    getApplicationsByJobId,
};
