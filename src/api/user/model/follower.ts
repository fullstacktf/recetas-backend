import { ObjectId } from 'mongodb';
import { Document, model, Model, Schema } from 'mongoose';
interface FollowerModel extends Document {
  id_user: ObjectId;
  followers: [
    {
      _id: ObjectId;
      username: string;
    }
  ];
}

const FollowerSchema: Schema = new Schema({
  id_user: ObjectId,
  follower: [
    {
      _id: ObjectId,
      username: String
    }
  ]
});

export const Follower: Model<FollowerModel> = model<FollowerModel>('follower', FollowerSchema);
