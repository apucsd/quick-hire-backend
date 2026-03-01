import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ApplicationService } from './application.service';

const createApplication = catchAsync(async (req: Request, res: Response) => {

    // console.log(req.body);
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

const getAllApplications = catchAsync(
    async (req: Request, res: Response) => {
        const result = await ApplicationService.getAllApplicationsFromDB(
            req.query,
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Applications fetched successfully',
            data: result.data,
            meta: result.meta,
        });
    },
);

export const ApplicationController = {
    createApplication,
    getApplicationsByJobId,
    getAllApplications,
};
