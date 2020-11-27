import { ObjectId } from 'mongodb';
import { Follower } from './model/follower';
import { Following } from './model/following';
import { User, UserModel } from './model/user';

export const getUsers = () => {
  return User.find({}, { username: 1, _id: 1 });
};

export const getUserById = (id: string) => {
  const _id = new ObjectId(id);
  return User.findById({ _id: _id }, { _v: 0, password: 0, creation: 0, lastLogin: 0, rol: 0 });
};

export const createUser = async (user: UserModel) => {
  const check = await checkUsernameEmail(user.username, user.email);
  if (!check) {
    return Promise.reject('Username o email ya existe');
  }
  const userToCreate = new User({ ...user });
  return userToCreate.save();
};

const checkUsernameEmail = async (username: string, email: string) => {
  const result = await User.find(
    { $or: [{ username: username }, { email: email }] },
    { _id: 0, username: 1, email: 1 }
  );
  return result.length ? false : true;
};

export const setUserPass = async (userID: string, pass: string, newPass: string) => {
  const _id = new ObjectId(userID);
  return User.update({ _id: _id, password: pass }, { $set: { password: newPass } });
};

export const addFollow = async (id: string, followingUser: string) => {
  const _id = new ObjectId(id);
  const _followingUser = new ObjectId(followingUser);
  const follow = await addFollower(_id, _followingUser);
  const following = await addFollowing(_id, _followingUser);
  await User.update({ _id: _id }, { $inc: { following: 1 } });
  await User.update({ _id: _followingUser }, { $inc: { followers: 1 } });
  return { follow, following };
};

const addFollower = async (follower: ObjectId, _followingUser: ObjectId) => {
  const user = await User.findById({ _id: follower }, { _id: 1, username: 1 });
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Follower.update({ id_user: _followingUser }, { $push: { followers: user } });
};

const addFollowing = async (follower: ObjectId, _followingUser: ObjectId) => {
  const user = await User.findById({ _id: _followingUser }, { _id: 1, username: 1 });
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Following.update({ id_user: follower }, { $push: { following: user } });
};

export const removeFollow = async (id: string, followingUser: string) => {
  const _id = new ObjectId(id);
  const _followingUser = new ObjectId(followingUser);
  const follow = await removeFollower(_id, _followingUser);
  const following = await removeFollowing(_id, _followingUser);
  await User.update({ _id: _id }, { $inc: { following: -1 } });
  await User.update({ _id: _followingUser }, { $inc: { followers: -1 } });
  return { follow, following };
};

const removeFollower = async (follower: ObjectId, _followingUser: ObjectId) => {
  const user = await User.findById({ _id: follower }, { _id: 1, username: 1 });
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Follower.update({ id_user: _followingUser }, { $pull: { followers: user } });
};

const removeFollowing = async (follower: ObjectId, _followingUser: ObjectId) => {
  const user = await User.findById({ _id: _followingUser }, { _id: 1, username: 1 });
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Following.update({ id_user: follower }, { $pull: { following: user } });
};
