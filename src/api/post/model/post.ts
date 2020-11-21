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
    _id: ObjectId,
    username: String
	},
  name: String,
  description: String,
  time: Number,
  servings: Number,
  ingredients: [Schema.Types.Mixed],
  steps: [String],
  creation: Date,
  likes: Number,
  comments: Number,
  tags: [String]
});

export const Post: Model<PostModel> = model<PostModel>('post', PostSchema);

