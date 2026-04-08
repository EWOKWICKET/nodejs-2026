import express from 'express';
import { UserController } from '../controlers';
import { authenticate, requireRole, uploadAvatar } from '../middlewares';
import { Role } from '../types';

const router = express.Router();

router.get('/', authenticate, requireRole(Role.ADMIN), UserController.getUsers);
router.get('/me', authenticate, UserController.getMe);
router.post('/me/avatar', authenticate, uploadAvatar, UserController.uploadAvatar);
router.delete('/me/avatar', authenticate, UserController.deleteAvatar);
router.get('/:id', authenticate, requireRole(Role.ADMIN), UserController.getUserById);

export default router;
