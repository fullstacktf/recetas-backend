import { ObjectId } from 'mongodb';
import { Document, model, Model, Schema } from 'mongoose';

export interface FollowingModel extends Document {
  id_user: ObjectId;
  following: [
    {
      _id: ObjectId;
      username: string;
    }
  ];
}

const FollowingSchema: Schema = new Schema({
  id_user: { type: ObjectId, required: true },
  following: {
    type: [
      {
        _id: { type: ObjectId, required: true },
        username: { type: String, required: true }
      }
    ], required: true
  }
});

export const Following: Model<FollowingModel> = model<FollowingModel>('following', FollowingSchema);
