import { ObjectId } from 'mongodb';
import { model, Model, Schema, Document } from 'mongoose';
// import { IngredientModel } from './ingredient';

export interface PostModel extends Document {
  owner: {
    _id: ObjectId;
    username: string;
  };
  name: string;
  description: string;
  time: string;
  servings: number;
  ingredients: [string];
  steps: [string];
  creation: Date;
  likes: number;
  comments: number;
  tags: [string];
}

const PostSchema: Schema = new Schema({
  owner: { type: Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  servings: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  creation: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  tags: { type: [String] }
});

export const Post: Model<PostModel> = model<PostModel>('post', PostSchema);
