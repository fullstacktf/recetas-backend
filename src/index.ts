import express from 'express';
import { connectDatabase } from './databaseUtils';
import { User } from './api/user/model/user';
import { Following } from './api/user/model/following';
import { ObjectId } from 'mongodb';
import userRouter from './api/user/';
import postRouter from './api/post/';
import commentRouter from './api/comment/';
import { Follower } from './api/user/model/follower';
import { Post } from './api/post/model/post';
import { Comment } from './api/comment/model/comment';

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
    // const newUser = new User({
    //   username: 'izm20',
    //   name: 'Imar',
    //   last: 'Abreu',
    //   email: 'email@email.mail',
    //   password: 'pass',
    //   rol: 'admin',
    //   description: 'un chico de fiar',
    //   publications: 0,
    //   followers: 0,
    //   following: 0
    // });

    // const newFollowing = new Following({
    //   id_user: new ObjectId('5fb94545038f21fbb5b2fc94'),
    //   following: [
    //     {
    //       _id: new ObjectId('5fb94526286f09fa633ee0ef'),
    //       username: 'izm20'
    //     },
    //     {
    //       _id: new ObjectId('5fb944ef153b9df9205a8cfe'),
    //       username: 'izm20'
    //     }
    //   ]
    // });
    // const newFollower = new Follower({
    //   id_user: new ObjectId('5fb94545038f21fbb5b2fc94'),
    //   follower: [
    //     {
    //       _id: new ObjectId('5fb94526286f09fa633ee0ef'),
    //       username: 'izm20'
    //     },
    //     {
    //       _id: new ObjectId('5fb944ef153b9df9205a8cfe'),
    //       username: 'izm20'
    //     }
    //   ]
    // });
    // const newPosts = new Post({
    //   owner: {
    //     _id: new ObjectId('5fb93e6365efa558ab4fd383'),
    //     username: 'izm20'
    //   },
    //   name: 'Pasta',
    //   description: 'Pues una pastita con cosas',
    //   time: 15,
    //   servings: 2,
    //   ingredients: [{ name: 'Espaguetis' }],
    //   steps: ['Calentar agua', 'Echar sal y aceite', 'Cuando hierve echar la pasta', 'Esperar 10 min', 'Escurrir la pasta'],
    //   tags: ['pasta']
    // });
    const newComments = new Comment({
      user: {
        _id: new ObjectId('5fb94545038f21fbb5b2fc94'),
        username: 'izm20'
      },
      comment: 'Bastante cutre la verdad',
      postiD: new ObjectId('5fb9795251cc72a384782ebc')
    });

    // newFollowing.save();
    // newUser.save();
    app.listen(3000, () => console.log('Listen on port 3000'));
  })
  .catch((error) => {
    console.error('Algo ha fallado', error);
  });
