import Joi from 'joi';

export default {
  login: {
    body: {
      email: Joi.string()
        .max(128)
        .required(),
      password: Joi.string()
        .max(512)
        .required()
    }
  },
  register: {
    body: {
      email: Joi.string()
        .email()
        .min(5)
        .max(128)
        .required(),
      password: Joi.string()
        .min(8)
        .max(512)
        .required()
    }
  }
};
