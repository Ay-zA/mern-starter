import HTTPStatus from 'http-status';
import ApiError from '@/utils/api-error';
import { app } from '~/configs';

export default class TaskClass {
  static get(id) {
    return this.findById(id)
      .exec()
      .then((task) => {
        if (task) {
          return task;
        }

        const err = new ApiError('Task not found!', HTTPStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

  static list({ skip = 0, limit = app.api.limit } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }

  static remove(id) {
    return this.get(id)
      .then(project => project.remove())
      .catch(e => Promise.reject(e));
  }
}
