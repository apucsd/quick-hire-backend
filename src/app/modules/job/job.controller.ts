import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { JobService } from './job.service';

const createJob = catchAsync(async (req: Request, res: Response) => {
    const result = await JobService.createJobIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Job created successfully',
        data: result,
    });
});

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
    const result = await JobService.getAllJobsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Jobs fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleJob = catchAsync(async (req: Request, res: Response) => {
    const result = await JobService.getSingleJobFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Job fetched successfully',
        data: result,
    });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
    const result = await JobService.deleteJobFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Job deleted successfully',
        data: result,
    });
});

const updateJob = catchAsync(async (req: Request, res: Response) => {
    const result = await JobService.updateJobIntoDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Job updated successfully',
        data: result,
    });
});

export const JobController = {
    createJob,
    getAllJobs,
    getSingleJob,
    deleteJob,
    updateJob,
};
