import { Job } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import QueryBuilder from '../../builder/QueryBuilder';

const createJobIntoDB = async (data: Job) => {
    const result = await prisma.job.create({
        data,
    });
    return result;
};

const getAllJobsFromDB = async (
    query: Record<string, unknown>
) => {

    const result = await new QueryBuilder(prisma.job, query)
        .search(['title', 'company', 'location', 'category', 'description', 'salary'])
        .filter()
        .sort()
        .paginate()
        .customFields({
            id: true,
            title: true,
            company: true,
            location: true,
            category: true,
            description: true,
            salary: true,
            createdAt: true,
            updatedAt: true,
        })
        .execute();

    return result;
};

const getSingleJobFromDB = async (id: string) => {
    const result = await prisma.job.findUnique({
        where: {
            id,
        },
    });
    return result;
};

const deleteJobFromDB = async (id: string) => {
    const result = await prisma.job.delete({
        where: {
            id,
        },
    });
    return result;
};

const updateJobIntoDB = async (id: string, data: Partial<Job>) => {
    const result = await prisma.job.update({
        where: {
            id,
        },
        data,
    });
    return result;
};

export const JobService = {
    createJobIntoDB,
    getAllJobsFromDB,
    getSingleJobFromDB,
    deleteJobFromDB,
    updateJobIntoDB,
};
