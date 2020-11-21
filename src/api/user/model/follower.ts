import { ObjectId } from 'mongodb';
import { Document, model, Model, Schema } from 'mongoose';

export interface FollowerModel extends Document {
  id_user: ObjectId;
  followers: [
    {
      _id: ObjectId;
      username: string;
    }
  ];
}

const FollowerSchema: Schema = new Schema({
  id_user: { type: ObjectId, required: true },
  follower: {
    type: [
      {
        _id: { type: ObjectId, required: true },
        username: { type: String, required: true }
      }
    ], required: true
  }
});

export const Follower: Model<FollowerModel> = model<FollowerModel>('follower', FollowerSchema);
