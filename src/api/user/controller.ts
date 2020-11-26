import { User, UserModel } from './model/user';

export const getUsers = () => {
  return User.find({}, { username: 1, _id: 0 });
};

export const getUserById = (username: string) => {
  return User.find(
    { username: username },
    { _id: 0, _v: 0, password: 0, creation: 0, lastLogin: 0, rol: 0 }
  );
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
