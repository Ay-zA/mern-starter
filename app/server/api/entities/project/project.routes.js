import { Router } from 'express';
import { celebrate } from 'celebrate';
import ProjectValidation from './project.validtor';
import * as ProjectController from './project.controller';

const router = Router();

router.get('/', ProjectController.getProjects);
router.post('/', celebrate(ProjectValidation.post), ProjectController.addProject);

router.param('id', ProjectController.getProjectIdFromParam);

router.get('/:id', ProjectController.getProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;
