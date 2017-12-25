import HTTPStatus from 'http-status';
import ApiError from '@/utils/api-error';
import Task from './task.model';
import Project from '../project.model';

export const getTasks = async (req, res, next) => {
  try {
    const { proj_id } = req.params;

    const project = await Project.findById(proj_id, { tasks: 1, _id: 0 })
      .populate('tasks')
      .exec();

    if (project == null) {
      throw new ApiError('Project Not Found', HTTPStatus.NOT_FOUND);
    }

    res.json(project.tasks);
  } catch (e) {
    res.status(500);
    next(e);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const { proj_id, task_id } = req.params;

    const project = await Project.findById(proj_id);

    if (project.tasks.indexOf(task_id) < 0) {
      throw new ApiError('Task Not Found', HTTPStatus.NOT_FOUND);
    }

    const task = await Task.get(task_id);
    res.json(task);
  } catch (e) {
    res.status(500);
    next(e);
  }
};

export const addTask = async (req, res, next) => {
  try {
    const { proj_id } = req.params;

    const project = await Project.findById(proj_id);
    if (project == null) {
      throw new ApiError('Project Not Found', HTTPStatus.NOT_FOUND);
    }

    const newTask = await Task.create(req.body);
    project.tasks.push(newTask._id);
    await project.save();

    res.status(201).json(newTask);
  } catch (e) {
    res.status(500);
    next(e);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ message: 'deleted' });
  } catch (e) {
    res.status(500);
  }
};
