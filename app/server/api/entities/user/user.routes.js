import { Router } from 'express';
import { celebrate } from 'celebrate';
import { localAuth } from '@/services/auth.service';
import userValidation from './user.validator';
import * as UserController from './user.controller';

const router = new Router();

router.post('/signup', celebrate(userValidation.post), UserController.signUp);
router.post('/login', localAuth, UserController.login);

export default router;
