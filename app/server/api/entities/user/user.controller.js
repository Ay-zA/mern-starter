import User from './user.model';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.list();

    res.json(users);
  } catch (e) {
    next(e);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.get(id);

    res.json(user);
  } catch (e) {
    next(e);
  }
};
