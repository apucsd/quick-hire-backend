import { Application } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createApplicationIntoDB = async (data: Application): Promise<Application> => {
    // Check if job exists
    const job = await prisma.job.findUnique({
        where: {
            id: data.jobId,
        },
    });

    if (!job) {
        throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
    }

    const result = await prisma.application.create({
        data,
    });
    return result;
};

const getApplicationsByJobIdFromDB = async (
    jobId: string,
): Promise<Application[]> => {
    const result = await prisma.application.findMany({
        where: {
            jobId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
};

export const ApplicationService = {
    createApplicationIntoDB,
    getApplicationsByJobIdFromDB,
};
