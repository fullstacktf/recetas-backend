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
