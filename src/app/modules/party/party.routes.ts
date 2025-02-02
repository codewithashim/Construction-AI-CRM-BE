import express from 'express';
import { PartyController } from './party.controller';
import { ENUM_USER_ROLE } from '../../../shared/enums/users-enum';
import authGuard from '../../../shared/middleware/auth-middleware';

const router = express.Router();

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
    PartyController.createParty,
);

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
    PartyController.getAllParties,
);

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
    PartyController.getPartyById,
);

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
    PartyController.updateParty,
);

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
    PartyController.deleteParty,
);

export const PartyRoutes = router;
