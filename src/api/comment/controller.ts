import { ObjectId } from 'mongodb';
import { CommentModel, Comment } from './model/comment';

export const createComment = (comment: CommentModel) => {
  comment.user._id = new ObjectId(comment.user._id);
  const newComment = new Comment(comment);
  return newComment.save();
};

export const removeComment = (commentID: string) => {
  const _id = new ObjectId(commentID);
  return Comment.findByIdAndDelete({ _id });
};

export const removeCommentByPostId = (postID: ObjectId) => {
  return Comment.deleteMany({ postID: postID });
};

export const editComment = (commentID: ObjectId, text: string) => {
  return Comment.updateOne({ _id: commentID }, { $set: { comment: text } });
};

export const addLike = (id: string) => {
  const _id = new ObjectId(id);
  return Comment.updateOne({ _id: _id }, { $inc: { likes: 1 } });
};

export const removeLike = async (id: string) => {
  const _id = new ObjectId(id);
  const isZero = await checkLike(_id);
  if (isZero) {
    throw new Error('No puede haber comentarios con likes negativos');
  }
  return Comment.updateOne({ _id: _id }, { $inc: { likes: -1 } });
};

const checkLike = async (_id: ObjectId): Promise<boolean> => {
  const result = await Comment.findById({ _id }, { likes: 1 });
  if (!result) {
    throw new Error('No existe el id');
  }
  return result.likes == 0 ? true : false;
};
