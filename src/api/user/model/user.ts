import { model, Model, Schema, Document } from 'mongoose';

export type Role = 'admin' | 'user';

export interface UserModel extends Document {
  username: string;
  name: string;
  last: string;
  email: string;
  password: string;
  creation: Date;
  lastLogin: Date;
  rol: Role;
  description: string;
  publications: number;
  followers: number;
  following: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: Schema.Types.Mixed, default: 'user', required: true },
  description: { type: String, default: '' },
  publications: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  creation: { type: Date, default: Date.now() },
  lastLogin: { type: Date, default: Date.now() }
});

export const User: Model<UserModel> = model<UserModel>('user', UserSchema);
