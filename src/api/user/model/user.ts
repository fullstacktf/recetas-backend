import { model, Model, Schema, Document } from 'mongoose';

export type Role = 'admin' | 'user';

export interface UserModel extends Document {
  username: string,
  name: string,
  last: string,
  email: string,
  password: string,
  creation: Date,
  lastLogin: Date,
  rol: Role,
  description: string,
  publications: number,
  followers: number,
  following: number
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  creation: { type: Date, default: Date.now() },
  lastLogin: { type: Date, default: Date.now() },
  rol: { type: Schema.Types.Mixed, required: true },
  description: { type: String, required: true },
  publications: { type: Number, required: true },
  followers: { type: Number, required: true },
  following: { type: Number, required: true }
});

export const User: Model<UserModel> = model<UserModel>('user', UserSchema);
