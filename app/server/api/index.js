// @flow
import { Router } from 'express';
import { jwtAuth } from '@/services/auth.service';
import { userRoutes } from './entities/user';
import { authRoutes } from './entities/auth';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);

export default apiRouter;
