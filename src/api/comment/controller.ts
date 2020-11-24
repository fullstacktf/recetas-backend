import { ObjectId } from 'mongodb';
import { Comment } from './model/comment';

export const addLike = (id: string) => {
  const _id = new ObjectId(id);
  return Comment.update({ _id: _id }, { $inc: { likes: 1 } });
};

export const removeLike = async (id: string) => {
  const _id = new ObjectId(id);
  const isZero = await checkLike(_id);
  if (isZero) {
    throw new Error('No puede haber comentarios con likes negativos');
  }
  return Comment.update({ _id: _id }, { $inc: { likes: -1 } });
};

const checkLike = async (_id: ObjectId): Promise<boolean> => {
  const result = await Comment.findById({ _id }, { likes: 1 });
  if (!result) {
    throw new Error('No existe el id');
  }
  return result.likes == 0 ? true : false;
};
