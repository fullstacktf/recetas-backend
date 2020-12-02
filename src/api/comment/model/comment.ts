import { ObjectId } from 'mongodb';
import { model, Model, Schema, Document } from 'mongoose';

export interface CommentModel extends Document {
  user: {
    _id: ObjectId;
    username: string;
  };
  comment: string;
  likes: number;
  postID: ObjectId;
  replies: [CommentModel];
}

const CommentSchema: Schema = new Schema({
  user: { type: Schema.Types.Mixed, required: true },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
  postID: { type: Schema.Types.ObjectId, required: true },
  replies: { type: [Schema.Types.Mixed], default: [] }
});

export const Comment: Model<CommentModel> = model<CommentModel>('comment', CommentSchema);
