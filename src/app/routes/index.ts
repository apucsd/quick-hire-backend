import express from 'express';
import { AuthRouters } from '../modules/auth/auth.routes';
import { UserRouters } from '../modules/user/user.routes';
import { JobRoutes } from '../modules/job/job.routes';
import { ApplicationRoutes } from '../modules/application/application.routes';
const router = express.Router();

type ModuleRoute = {
    path: string;
    route: express.Router;
};

const moduleRoutes: ModuleRoute[] = [
    {
        path: '/auth',
        route: AuthRouters,
    },
    {
        path: '/users',
        route: UserRouters,
    },
    {
        path: '/jobs',
        route: JobRoutes,
    },
    {
        path: '/applications',
        route: ApplicationRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
