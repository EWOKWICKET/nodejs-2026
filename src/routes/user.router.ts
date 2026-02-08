import express from 'express';
import { UserController } from '../controlers';

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.post('/', UserController.createUser);

export default router;
