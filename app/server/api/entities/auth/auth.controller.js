import HttpStatus from 'http-status';
import User from '../user/user.model';

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(HttpStatus.CREATED).json(user);
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  if (!req.user) {
    res.status(HttpStatus.NOT_FOUND).end();
  }

  res.json(req.user.toAuthJSON());
};
