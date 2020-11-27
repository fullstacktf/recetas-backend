import { ObjectId } from 'mongodb';
import { Post } from './model/post';

export const getPostTimeline = (following: ObjectId[]) => {
  // TODO: Poner limit
  return Post.find({ 'owner._id': following }, { __v: 0 }).sort({ creation: -1 });
};
