import { Application } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';

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

const getAllApplicationsFromDB = async (
    query: Record<string, unknown>
) => {
    const result = await new QueryBuilder(prisma.application, query)
        .search(['email', 'resumeLink', 'coverNote'])
        .filter()
        .sort()
        .paginate()
        .customFields({
            id: true,
            jobId: true,
            email: true,
            resumeLink: true,
            coverNote: true,
            createdAt: true,
        })
        .unnestCount()
        .execute();
    return result;
};

export const ApplicationService = {
    createApplicationIntoDB,
    getApplicationsByJobIdFromDB,
    getAllApplicationsFromDB,
};
