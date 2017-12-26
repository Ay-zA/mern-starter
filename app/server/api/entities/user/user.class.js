import HTTPStatus from 'http-status';
import ApiError from '@/utils/api-error';
import { app } from '~/configs';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

export default class UserClass {
  static get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new ApiError('User not found!', HTTPStatus.NOT_FOUND);
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

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // eslint-disable-next-line class-methods-use-this
  _hashPassword(password) {
    return hashSync(password);
  }

  authenticate(password) {
    return compareSync(password, this.password);
  }

  toAuthJSON() {
    return {
      id: this._id,
      email: this.email,
      name: this.name,
      token: `Bearer ${this.createToken()}`
    };
  }

  createToken() {
    const tomorrow = Number(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));
    return jwt.sign(
      { id: this._id, exp: tomorrow },
      process.env.JWT_SECRET
    );
  }

  toJSON() {
    return {
      id: this._id,
      email: this.email,
      name: this.name
    };
  }
}
