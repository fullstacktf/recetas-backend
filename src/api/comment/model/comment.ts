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
    type: {
      _id: ObjectId,
      username: String
    }, required: true
  },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
  postiD: { type: ObjectId, required: true },
  replies: { type: [Schema.Types.Mixed], default: [] }
});

export const Comment: Model<CommentModel> = model<CommentModel>('comment', CommentSchema);
