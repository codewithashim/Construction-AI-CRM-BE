import express from 'express';
import { UserRoutes } from '../modules/users/users.routes';
import { healthCheck } from '../modules/health/health.controller';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ProjectRoutes } from '../modules/project/project.routes';
import { PartyRoutes } from '../modules/party/party.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/health',
        route: healthCheck,
    },
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/projects',
        route: ProjectRoutes,
    },
    {
        path: '/parties',
        route: PartyRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
