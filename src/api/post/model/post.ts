import { ObjectId } from 'mongodb';
import { model, Model, Schema, Document } from 'mongoose';
import { IngredientModel } from './ingredient';

export interface PostModel extends Document {
  owner: {
    _id: ObjectId;
    username: string;
  }
  name: string;
  description: string;
  time: number;
  servings: number;
  ingredients: [IngredientModel];
  steps: [string];
  creation: Date;
  likes: number;
  comments: number;
  tags: [string];
}

const PostSchema: Schema = new Schema({
  owner: {
    type: {
      _id: ObjectId,
      username: String
    }, required: true
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  servings: { type: Number, required: true },
  ingredients: { type: [Schema.Types.Mixed], required: true },
  steps: { trype: [String], required: true },
  creation: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  tags: { type: [String] }
});

export const Post: Model<PostModel> = model<PostModel>('post', PostSchema);

