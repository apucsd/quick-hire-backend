import { User, UserRoleEnum, UserStatus } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import * as bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getAllUsersFromDB = async (query: any) => {
    const usersQuery = new QueryBuilder<typeof prisma.user>(prisma.user, query);

    const result = await usersQuery
        .search(['name', 'email'])
        .filter()
        .sort()
        .fields()
        .customFields({
            id: true,
            name: true,
            email: true,
            role: true,
            bio: true,
            profile: true,
            phone: true,
            status: true,
            nationality: true,
            dateOfBirth: true,
        })

        .paginate()
        .execute();

    return result;
};

const getMyProfileFromDB = async (id: string) => {

    const profile = await prisma.user.findUniqueOrThrow({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            bio: true,
            profile: true,
            phone: true,
            nationality: true,
            dateOfBirth: true,
            notificationsEnabled: true,
        },
    });

    return profile;
};

const getUserDetailsFromDB = async (id: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            profile: true,
            phone: true,
            status: true,
            nationality: true,
            dateOfBirth: true,
            createdAt: true,
        },
    });

    return user;
};

const updateMyProfileIntoDB = async (
    id: string,

    payload: Partial<User>
) => {
    delete payload.email;

    const result = await prisma.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};

const updateUserRoleStatusIntoDB = async (id: string, role: UserRoleEnum) => {
    const result = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            role: role,
        },
    });
    return result;
};
const updateProfileStatus = async (id: string, status: UserStatus) => {
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: {
            status,
        },
        select: {
            id: true,
            status: true,
            role: true,
        },
    });
    return result;
};

const deleteMyAccountFromDB = async (id: string, password: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
        select: {
            password: true,
        },
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
    }
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: {
            status: 'DELETED',
        },
    });
    return result;
};

export const UserServices = {
    getAllUsersFromDB,
    getMyProfileFromDB,
    getUserDetailsFromDB,
    updateMyProfileIntoDB,
    updateUserRoleStatusIntoDB,
    updateProfileStatus,
    deleteMyAccountFromDB,
};
