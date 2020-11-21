import { ObjectId } from 'mongodb';

export interface Comment {
  user: {
    _id: ObjectId;
    username: string;
  },
  comment: string,
  likes: number,
  postiD: ObjectId,
  replies: [Comment];
}

/*export interface Like {
    user: ObjectId,
    likes: number
}*/
