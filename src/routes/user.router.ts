import express from 'express';
import { UserController } from '../controlers';
import { authenticate, requireRole } from '../middlewares';
import { Role } from '../types';

const router = express.Router();

router.get('/', authenticate, requireRole(Role.ADMIN), UserController.getUsers);
router.get('/me', authenticate, UserController.getMe);
router.get('/:id', authenticate, requireRole(Role.ADMIN), UserController.getUserById);

export default router;
