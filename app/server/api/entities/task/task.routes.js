// flow
import { Router } from 'express';
import { celebrate } from 'celebrate';
import TaskValidation from './task.validator';
import * as TaskController from './task.controller';

const router = Router();

router.get('/', TaskController.getTasks);
router.get('/:task_id', TaskController.getTask);
router.post('/', celebrate(TaskValidation.post), TaskController.addTask);
router.delete('/:id', TaskController.deleteTask);


export default router;
