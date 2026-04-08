import express from 'express';
import { AuthController } from '../controlers';
import { validate } from '../middlewares';
import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from '../schemas';

const router = express.Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post(
  '/request-password-reset',
  validate(requestPasswordResetSchema),
  AuthController.requestPasswordReset,
);
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);

export default router;
