import { ObjectId } from 'mongodb';

export interface Role {
  rol: 'admin' | 'user';
}

export interface User {
  username: string;
  name: string;
  last: string;
  email: string;
  creation: Date;
  password: string;
  lastLogin: Date;
  rol: Role;
  description: string;
  publications: number;
  followers: number;
  following: number;
}

export interface Followers {
  id_user: ObjectId;
  followers: [
    {
      _id: ObjectId;
      username: string;
    }
  ];
}

export interface Following {
  id_user: ObjectId;
  following: [
    {
      _id: ObjectId;
      username: string;
    }
  ];
}
