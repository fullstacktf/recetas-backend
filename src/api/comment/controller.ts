import { ObjectId } from 'mongodb';
import { Comment } from './model/comment';

export const getLikes = (id: string) => {
  const _id = new ObjectId(id);
  return Comment.update({ _id: _id }, { $inc: { likes: 1 } });
};
