import express from 'express';
import { UserRoutes } from '../modules/users/users.routes';
import { healthCheck } from '../modules/health/health.controller';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: healthCheck,
    },
    {
        path: '/users',
        route: UserRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
