import { Router } from 'express';
import celebrate from 'celebrate';
import { localAuth } from '@/services/auth.service';
import authValidator from './auth.validator';
import * as authController from './auth.controller';

const authRoutes = new Router();

authRoutes.post(
  '/login',
  celebrate(authValidator.login),
  localAuth,
  authController.login
);
authRoutes.post(
  '/register',
  celebrate(authValidator.register),
  authController.register
);

export default authRoutes;
