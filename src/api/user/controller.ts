import { ObjectId } from 'mongodb';
import { createToken } from '../middelwares/auth';
import { getPostTimeline } from '../post/controller';
import { Follower } from './model/follower';
import { Following } from './model/following';
import { User, UserModel } from './model/user';

export const getUsers = () => {
  return User.find({}, { username: 1, _id: 1 });
};

export const getUserById = (id: string) => {
  const _id = new ObjectId(id);
  return User.findById(
    { _id: _id },
    { _v: 0, password: 0, creation: 0, lastLogin: 0, rol: 0 }
  );
};

export const loginUser = async (user: UserModel)=> {
  const findUser = await User.findOne({username: user.username});
  if(findUser){
    const checkPassword = await findUser.comparePassword(user.password);
    if(checkPassword){
      const token = createToken(findUser);
      let data: any = {
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
        name: findUser.name,
        last: findUser.last,
        rol: findUser.rol,
        description: findUser.description,
        publications: findUser.publications,
        followers: findUser.followers,
        following: findUser.following,
        saved: findUser.saved,
        token
      };
      return Promise.resolve(data);
    }
  }
  return Promise.reject('Credeciales invalidas');
};

export const createUser = async (user: UserModel) => {
  const check = await checkUsernameEmail(user.username, user.email);
  if (!check) {
    return Promise.reject('Username o email ya existe');
  }
  const userToCreate = new User({ ...user });
  const createdUser = userToCreate.save();
  return createdUser ? true : false;
};

const checkUsernameEmail = async (username: string, email: string) => {
  const result = await User.find(
    { $or: [{ username: username }, { email: email }] },
    { _id: 0, username: 1, email: 1 }
  );
  return result.length ? false : true;
};

export const setUserPass = async (
  userID: string,
  pass: string,
  newPass: string
) => {
  const _id = new ObjectId(userID);
  return User.updateOne(
    { _id: _id, password: pass },
    { $set: { password: newPass } }
  );
};

export const addFollow = async (id: string, followingUser: string) => {
  const _id = new ObjectId(id);
  const _followingUser = new ObjectId(followingUser);
  const follow = await addFollower(_id, _followingUser);
  const following = await addFollowing(_id, _followingUser);
  await User.updateOne({ _id: _id }, { $inc: { following: 1 } });
  await User.updateOne({ _id: _followingUser }, { $inc: { followers: 1 } });
  return { follow, following };
};

const addFollower = async (follower: ObjectId, _followingUser: ObjectId) => {
  const user = await User.findById({ _id: follower }, { _id: 1, username: 1 });
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Follower.updateOne(
    { id_user: _followingUser },
    { $push: { followers: user } }
  );
};

const addFollowing = async (follower: ObjectId, _followingUser: ObjectId) => {
  const user = await User.findById(
    { _id: _followingUser },
    { _id: 1, username: 1 }
  );
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Following.updateOne(
    { id_user: follower },
    { $push: { following: user } }
  );
};

export const removeFollow = async (id: string, followingUser: string) => {
  const _id = new ObjectId(id);
  const _followingUser = new ObjectId(followingUser);
  const follow = await removeFollower(_id, _followingUser);
  const following = await removeFollowing(_id, _followingUser);
  await User.updateOne({ _id: _id }, { $inc: { following: -1 } });
  await User.updateOne({ _id: _followingUser }, { $inc: { followers: -1 } });
  return { follow, following };
};

const removeFollower = async (follower: ObjectId, _followingUser: ObjectId) => {
  const user = await User.findById({ _id: follower }, { _id: 1, username: 1 });
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Follower.updateOne(
    { id_user: _followingUser },
    { $pull: { followers: user } }
  );
};

const removeFollowing = async (
  follower: ObjectId,
  _followingUser: ObjectId
) => {
  const user = await User.findById(
    { _id: _followingUser },
    { _id: 1, username: 1 }
  );
  if (!user) {
    throw new Error('Usuario no existe');
  }
  return Following.updateOne(
    { id_user: follower },
    { $pull: { following: user } }
  );
};

export const getTimeline = async (id: string) => {
  const _id = new ObjectId(id);
  const following = await getFollowing(_id);
  return getPostTimeline(following);
};

const getFollowing = async (_id: ObjectId) => {
  const following = await Following.find(
    { id_user: _id },
    { following: 1, _id: 0 }
  );
  return following[0].following.map((elem) => elem._id);
};

export const editUser = (id: string, user: UserModel) => {
  const _id = new ObjectId(id);
  return User.updateOne(
    { _id: _id },
    {
      $set: {
        name: user.name,
        last: user.last,
        email: user.email,
        password: user.password,
        description: user.description
      }
    }
  );
};

export const saveUserPost = async (postID: ObjectId, userID: ObjectId) => {
  const post = await checkSaveUserPost(postID, userID);
  if (post.length) {
    throw new Error('Este usuario ya tiene guardado el post');
  }
  return User.updateOne({ _id: userID }, { $push: { saved: postID } });
};

export const deleteSaveUserPost = async (
  postID: ObjectId,
  userID: ObjectId
) => {
  const post = await checkSaveUserPost(postID, userID);
  if (!post.length) {
    throw new Error('Este usuario no tiene guardado el post');
  }
  return User.updateOne({ _id: userID }, { $pull: { saved: postID } });
};

const checkSaveUserPost = (postID: ObjectId, userID: ObjectId) => {
  return User.find({ _id: userID, saved: postID }, { _id: 1 });
};

export const getSaveUserPost = (userID: ObjectId) => {
  return User.find({ _id: userID }, { saved: 1, _id: 0 });
};
