import express from 'express';
import { connectDatabase } from './databaseUtils';
import userRouter from './api/user/';
import postRouter from './api/post/';
import commentRouter from './api/comment/';

const app = express();
app.use(express.json());

app.use('/static', express.static('/public'));

app.use('/user', userRouter);

app.use('/post', postRouter);

app.use('/comment', commentRouter);

app.get('/', async (req, res) => {
  res.json('OK');
});

connectDatabase()
  .then(() => {
    app.listen(3000, () => console.log('Listen on port 3000'));
  })
  .catch((error) => {
    console.error('Algo ha fallado', error);
  });
