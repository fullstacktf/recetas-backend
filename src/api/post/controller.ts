import { ObjectId } from 'mongodb';
import { createComment, removeComment } from '../comment/controller';
import { CommentModel } from '../comment/model/comment';
import { Post } from './model/post';

export const getPost = (id: string) => {
  const _id = new ObjectId(id);
  return Post.findById({ _id }, { __v: 0 });
};

export const getPostByTag = (tag: string) => {
  return Post.find({ tags: tag }, { __v: 0 });
};

export const addPostLike = (id: string) => {
  const _id = new ObjectId(id);
  return Post.update({ _id: _id }, { $inc: { likes: 1 } });
};

export const removePostLike = async (id: string) => {
  const _id = new ObjectId(id);
  const isZero = await checkZeroLikes(_id);
  if (isZero) {
    throw new Error('No puede haber post con likes negativos');
  }
  return Post.update({ _id: _id }, { $inc: { likes: -1 } });
};

const checkZeroLikes = async (_id: ObjectId): Promise<boolean> => {
  const result = await Post.findById({ _id }, { likes: 1 });
  if (!result) {
    throw new Error('No existe el id');
  }
  return result.likes == 0 ? true : false;
};

export const addPostComment = async (id: string, comment: CommentModel) => {
  const _id = new ObjectId(id);
  createComment(comment);
  return Post.update({ _id: _id }, { $inc: { comments: 1 } });
};

export const removePostComment = async (id: string, commentID: string) => {
  const _id = new ObjectId(id);
  const result = await removeComment(commentID);
  if (!result) {
    throw new Error('El comentario no existe');
  }
  return Post.update({ _id: _id }, { $inc: { comments: -1 } });
};
