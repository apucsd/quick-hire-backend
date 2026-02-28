import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobValidation } from './job.validation';
import { JobController } from './job.controller';

const router = express.Router();

router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getSingleJob);

router.post(
    '/',
    validateRequest.body(JobValidation.createJobZodSchema),
    JobController.createJob,
);

router.patch(
    '/:id',
    validateRequest.body(JobValidation.updateJobZodSchema),
    JobController.updateJob,
);

router.delete('/:id', JobController.deleteJob);

export const JobRoutes = router;
