import express from 'express';
import { connectDatabase } from './databaseUtils';
import userRouter from './api/user/';
import postRouter from './api/post/';
import commentRouter from './api/comment/';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { jwtStrategy } from './api/middelwares/auth';
import fileUpload from 'express-fileupload';

dotenv.config();
export type UploadedFile = fileUpload.UploadedFile;

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);
app.use(fileUpload());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3001']);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Pass to next layer of middleware
  next();
});

app.use('/static', express.static('/public'));

app.use('/user', userRouter);

app.use('/post', postRouter);

app.use('/comment', commentRouter);

app.get('/', async (req, res) => {
  res.json('OK');
});

connectDatabase()
  .then(() => {
    app.listen(app.get('port'), () => console.log(`Listen on port ${app.get('port')}`));
  })
  .catch((error) => {
    console.error('Algo ha fallado', error);
  });
