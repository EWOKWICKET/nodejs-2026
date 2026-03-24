import express from 'express';
import { UserController } from '../controlers';
import { validate } from '../middlewares';
import { createUserSchema } from '../schemas';

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.post('/', validate(createUserSchema), UserController.createUser);

export default router;
