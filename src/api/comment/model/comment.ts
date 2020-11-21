import { ObjectId } from 'mongodb';
import { model, Model, Schema, Document } from 'mongoose';

export interface CommentModel extends Document {
  user: {
    _id: ObjectId;
    username: string;
  },
  comment: string,
  likes: number,
  postiD: ObjectId,
  replies: [CommentModel];
}

const CommentSchema: Schema = new Schema({
  user: {
    _id: ObjectId,
    username: String
  },
  comment: String,
  likes: Number,
  postiD: ObjectId,
  replies: [Schema.Types.Mixed]
});

export const Comment: Model<CommentModel> = model<CommentModel>('comment', CommentSchema);
