import Jimp from 'jimp';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import { UploadedFile } from '../..';
import {
  createComment,
  editComment,
  removeComment,
  removeCommentByPostId
} from '../comment/controller';
import { CommentModel } from '../comment/model/comment';
import {
  deleteSaveUserPost,
  getSaveUserPost,
  incrementUserPost,
  saveUserPost
} from '../user/controller';
import { Post, PostModel } from './model/post';

const PATH = '/public/users';

export const getPost = (id: string) => {
  const _id = new ObjectId(id);
  return Post.findById({ _id }, { __v: 0 });
};

export const getPostByName = (postName: string) => {
  return Post.find(
    { name: { $regex: '.*' + postName + '.*', $options: 'i' } },
    { __v: 0 }
  ).limit(10);
};

export const getUserPosts = (id: string) => {
  const _id = new ObjectId(id);
  return Post.find(
    { 'owner._id': _id },
    { _v: 0, creation: 0}
  );
};

export const getPostByTag = (tag: string) => {
  return Post.find({ tags: tag }, { __v: 0 });
};

export const addPostLike = (id: string) => {
  const _id = new ObjectId(id);
  return Post.updateOne({ _id: _id }, { $inc: { likes: 1 } });
};

export const removePostLike = async (id: string) => {
  const _id = new ObjectId(id);
  const isZero = await checkZeroLikes(_id);
  if (isZero) {
    throw new Error('No puede haber post con likes negativos');
  }
  return Post.updateOne({ _id: _id }, { $inc: { likes: -1 } });
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
  return Post.updateOne({ _id: _id }, { $inc: { comments: 1 } });
};

export const editPostComment = async (commentID: string, text: string) => {
  const _commentID = new ObjectId(commentID);
  return editComment(_commentID, text);
};

export const removePostComment = async (id: string, commentID: string) => {
  const _id = new ObjectId(id);
  const result = await removeComment(commentID);
  if (!result) {
    throw new Error('El comentario no existe');
  }
  return Post.updateOne({ _id: _id }, { $inc: { comments: -1 } });
};

export const createPost = async (post: PostModel) => {
  post.owner._id = new ObjectId(post.owner._id);
  const newPost = new Post(post);
  await incrementUserPost(post.owner._id);
  return newPost.save();
};

export const removePost = async (id: string) => {
  const _id = new ObjectId(id);
  const result = await Post.findByIdAndDelete({ _id });
  if (!result) {
    throw new Error('El post no existe');
  }
  const comments = await removeCommentByPostId(_id);
  return { result, comments };
};

export const getPostByLikes = () => {
  return Post.find({}, { __v: 0 }).sort({ likes: -1 }).limit(15);
};

export const getPostTimeline = (following: {_id: ObjectId, username: string }[]) => {
  // TODO: Poner limit
  return Post.find({ 'owner._id': following.map(elem => elem._id) }, { __v: 0 }).sort({
    creation: -1
  });
};

export const savePost = (postID: string, userID: string) => {
  const _postID = new ObjectId(postID);
  const _userID = new ObjectId(userID);
  return saveUserPost(_postID, _userID);
};

export const deleteSavePost = (postID: string, userID: string) => {
  const _postID = new ObjectId(postID);
  const _userID = new ObjectId(userID);
  return deleteSaveUserPost(_postID, _userID);
};

export const getSavePost = (userID: string) => {
  const _userID = new ObjectId(userID);
  return getSaveUserPost(_userID);
};

export const editPost = async (postID: string, post: PostModel) => {
  const _postID = new ObjectId(postID);
  return Post.updateOne({ _id: _postID }, { $set: post });
};

export const uploadImage = async (
  image: UploadedFile,
  userID: string,
  postID: string
) => {
  if (!userID) {
    return Promise.reject('No userID');
  }
  let path = `${PATH}/${userID}`;
  let name = userID;
  createDir(path);
  if (postID) {
    path += '/posts';
    createDir(path);
    path += `/${postID}`;
    createDir(path);
    name = postID;
  }
  const rawImagePath = `${path}/${image.name}`;
  await saveImage(image, rawImagePath);
  jpgConverter(path, rawImagePath, name);
  removeImage(rawImagePath);
  return Promise.resolve('Image uploaded');
};

const jpgConverter = (path: string, rawImagePath: string, name: string) => {
  return Jimp.read(rawImagePath, (err, image) => {
    if (err) {
      throw err;
    }
    image.quality(60).write(`${path}/${name}.jpg`);
  });
};

const saveImage = async (image: UploadedFile, path: string) => {
  return image.mv(path);
};

const removeImage = async (path: string) => {
  return fs.unlinkSync(path);
};

const createDir = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
