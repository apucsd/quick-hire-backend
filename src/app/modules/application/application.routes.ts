import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationValidation } from './application.validation';
import { ApplicationController } from './application.controller';

const router = express.Router();

router.post(
    '/',
    validateRequest.body(ApplicationValidation.createApplicationZodSchema),
    ApplicationController.createApplication,
);

router.get('/job/:jobId', ApplicationController.getApplicationsByJobId);

export const ApplicationRoutes = router;
