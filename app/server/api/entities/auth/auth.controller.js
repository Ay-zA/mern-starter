import HttpStatus from 'http-status';
import User from '../user/user.model';

export async function register(req, res, next) {
  try {
    const newUser = await User.create(req.body);
    return res.status(HttpStatus.CREATED).json(newUser);
  } catch (e) {
    e.status = HttpStatus.INTERNAL_SERVER_ERROR;
    return next(e);
  }
}

export async function login(req, res, next) {
  if (!req.user) {
    return res.status(HttpStatus.NOT_FOUND).end();
  }
  res.status(HttpStatus.OK).json(req.user.toAuthJSON());

  return next();
}
