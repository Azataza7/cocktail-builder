import mongoose, { HydratedDocument, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserFields } from '../types';

const SALT_WORK_FACTOR = 10;

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>

const UserSchema = new Schema<UserFields, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (
        this: HydratedDocument<UserFields>,
        value: string
      ): Promise<boolean> {
        if (!this.isModified("email")) return true;

        const user = await User.findOne({ email: value });
        return !user;
      },
      message: "this email has been reserved",
    },
  },
  displayName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  googleID: String,

  token: {
    type: String,
    required: true,
  },
});

UserSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }

});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);

export default User;
