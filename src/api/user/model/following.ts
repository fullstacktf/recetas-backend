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
  id_user: { type: Schema.Types.ObjectId, required: true, unique: true },
  following: {
    type: [Schema.Types.Mixed], required: true
  }
});

export const Following: Model<FollowingModel> = model<FollowingModel>('following', FollowingSchema);
