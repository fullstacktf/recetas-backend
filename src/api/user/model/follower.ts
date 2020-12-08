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
  id_user: { type: Schema.Types.ObjectId, required: true, unique: true },
  followers: {
    type: [Schema.Types.Mixed],
    required: true
  }
});

export const Follower: Model<FollowerModel> = model<FollowerModel>(
  'follower',
  FollowerSchema
);
