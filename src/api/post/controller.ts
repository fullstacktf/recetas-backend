import { ObjectId } from 'mongodb';
import { Post } from './model/post';

export const getPost = (id: string) => {
  const _id = new ObjectId(id);
  return Post.findById({ _id }, { __v: 0 });
};

export const getPostByTag = (tag: string) => {
  return Post.find({ tags: tag }, { __v: 0 });
};
