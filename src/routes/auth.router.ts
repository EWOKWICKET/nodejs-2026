import express from 'express';
import { AuthController } from '../controlers';
import { validate } from '../middlewares';
import { registerSchema, loginSchema } from '../schemas';

const router = express.Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
