import { UserRoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { prisma } from '../utils/prisma';

const superAdminData = {
    name: 'Super Admin',
    email: 'admin@gmail.com',
    password: '123456',
    dateOfBirth: '2000-01-01T00:00:00.000Z',
    phone: '01821558090',
    role: UserRoleEnum.SUPER_ADMIN,
    isAgreeWithTerms: true,
    isEmailVerified: true,
};

const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExists = await prisma.user.findFirst({
            where: {
                role: UserRoleEnum.SUPER_ADMIN,
            },
        });

        if (!isSuperAdminExists) {
            superAdminData.password = await bcrypt.hash(
                config.super_admin_password as string,
                Number(config.bcrypt_salt_rounds) || 12
            );
            await prisma.user.create({
                data: superAdminData,
            });
            console.log('Super Admin created successfully.');
        } else {
            return;
        }
    } catch (error) {
        console.error('Error seeding Super Admin:', error);
    }
};

export default seedSuperAdmin;
