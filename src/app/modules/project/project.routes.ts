import express from 'express';
import { ProjectController } from './project.controller';
import authGuard from '../../../shared/middleware/auth-middleware';
import { ENUM_USER_ROLE } from '../../../shared/enums/users-enum';

const router = express.Router();

/**
 * @route POST /projects
 * @desc Create a new project
 * @access Private
 */
router.post(
    '/',
    authGuard(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.LABOR_CONTRACTOR,
        ENUM_USER_ROLE.SUPERVISOR,
        ENUM_USER_ROLE.MANAGER,
    ),
    ProjectController.createProject,
);

/**
 * @route GET /projects
 * @desc Get all projects
 * @access Private
 */
router.get(
    '/',
    authGuard(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.LABOR_CONTRACTOR,
        ENUM_USER_ROLE.SUPERVISOR,
        ENUM_USER_ROLE.MANAGER,
    ),
    ProjectController.getAllProjects,
);

/**
 * @route GET /projects/:id
 * @desc Get a project by ID
 * @access Private
 */
router.get(
    '/:id',
    authGuard(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.LABOR_CONTRACTOR,
        ENUM_USER_ROLE.SUPERVISOR,
        ENUM_USER_ROLE.MANAGER,
    ),
    ProjectController.getProjectById,
);

/**
 * @route PATCH /projects/:id
 * @desc Update a project
 * @access Private
 */
router.patch(
    '/:id',
    authGuard(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.LABOR_CONTRACTOR,
        ENUM_USER_ROLE.SUPERVISOR,
        ENUM_USER_ROLE.MANAGER,
    ),
    ProjectController.updateProject,
);

/**
 * @route DELETE /projects/:id
 * @desc Delete a project
 * @access Private
 */
router.delete(
    '/:id',
    authGuard(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.LABOR_CONTRACTOR,
        ENUM_USER_ROLE.SUPERVISOR,
        ENUM_USER_ROLE.MANAGER,
    ),
    ProjectController.deleteProject,
);

export const ProjectRoutes = router;
