import mongoose from 'mongoose';
import UserClass from './user.class';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email is required!'],
      lowercase: true
    },
    name: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minLength: [6, 'Password need to be longer!']
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  next();
});

UserSchema.loadClass(UserClass);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
