import { Joi } from 'celebrate';

export default {
  post: {
    body: {
      title: Joi.string().required()
    }
  }
};
