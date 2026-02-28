import express from 'express';
import auth from '../../middlewares/auth';
import { parseBody } from '../../middlewares/parseBody';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/', auth('SUPER_ADMIN', 'USER'), UserControllers.getAllUsers);
router.get('/me', auth('ANY'), UserControllers.getMyProfile);

router.get('/:id', auth('SUPER_ADMIN'), UserControllers.getUserDetails);

router.patch(
    '/update-profile',
    auth('ANY'),
    parseBody,
    validateRequest.body(userValidation.updateUser),
    UserControllers.updateMyProfile
);

router.patch(
    '/user-role/:id',
    auth('SUPER_ADMIN'),
    validateRequest.body(userValidation.updateUserRoleSchema),
    UserControllers.updateUserRoleStatus
);

router.patch(
    '/user-status/:id',
    auth('SUPER_ADMIN'),
    validateRequest.body(userValidation.updateUserStatus),
    UserControllers.updateUserStatus
);

router.delete(
    '/delete-account',
    auth('ANY'),
    parseBody,
    validateRequest.body(userValidation.deleteMyAccount),
    UserControllers.deleteMyAccount
);

export const UserRouters = router;
