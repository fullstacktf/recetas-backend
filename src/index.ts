import express from 'express';
import { connectDatabase } from './databaseUtils';
import { User } from './api/user/model/user';
import { Following } from './api/user/model/following';
import { ObjectId } from 'mongodb';
import userRouter from './api/user/';
import postRouter from './api/post/';
import commentRouter from './api/comment/';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  res.json(await Following.find());
});

app.use('/user', userRouter);

app.use('/post', postRouter);

app.use('/comment', commentRouter);

connectDatabase()
  .then(() => {
    const newUser = new User({
      username: 'izm20',
      name: 'Imar',
      last: 'Abreu',
      email: 'email@email.mail',
      password: 'pass',
      rol: 'admin',
      description: 'un chico de fiar',
      publications: 0,
      followers: 0,
      following: 0
    });

    const newFollowing = new Following({
      id_user: new ObjectId('5fb94545038f21fbb5b2fc94'),
      following: [
        {
          _id: new ObjectId('5fb94526286f09fa633ee0ef'),
          username: 'izm20'
        },
        {
          _id: new ObjectId('5fb944ef153b9df9205a8cfe'),
          username: 'izm20'
        }
      ]
    });

    // newFollowing.save();
    // newUser.save();
    app.listen(3000, () => console.log('Listen on port 3000'));
  })
  .catch((error) => {
    console.error('Algo ha fallado', error);
  });
