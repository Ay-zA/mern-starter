import { Router } from 'express';
import userRoutes from './entities/user/user.routes';
import { projectRoutes } from './entities/project';

const apiRouter = new Router();
// import { jwtAuth } from '@/services/auth.service';

apiRouter.use('/users', userRoutes);
apiRouter.use('/projects', projectRoutes);

export default apiRouter;
