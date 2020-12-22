import express from 'express';
import passport from 'passport';
import { UploadedFile } from 'express-fileupload';
import {
  getPost,
  getPostByTag,
  addPostLike,
  removePostLike,
  addPostComment,
  removePostComment,
  createPost,
  removePost,
  getPostByLikes,
  editPostComment,
  savePost,
  deleteSavePost,
  getSavePost,
  editPost,
  getPostByName,
  uploadImage,
  getUserPosts
} from './controller';

const router = express.Router();

router.get('/public/popular', async (req, res) => {
  try {
    const posts = await getPostByLikes();
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/search/:postName', async (req, res) => {
  try {
    const post = await getPostByName(req.params.postName);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/:postID', async (req, res) => {
  try {
    const post = await getPost(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/tag/:tagID', async (req, res) => {
  try {
    const posts = await getPostByTag(req.params.tagID);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/user/:userID', async (req, res) => {
  try {
    const user = await getUserPosts(req.params.userID);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ msg: String(error) });
  }
});

// middleware USUARIOS LOGUEADOS
router.use(passport.authenticate('jwt', { session: false }));

router.post('/:postID/like', async (req, res) => {
  try {
    const post = await addPostLike(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID/like', async (req, res) => {
  try {
    const post = await removePostLike(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.post('/:postID/comment', async (req, res) => {
  try {
    const comment = await addPostComment(req.params.postID, req.body);
    res.status(200).json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.put('/:postID/comment', async (req, res) => {
  try {
    const comment = await editPostComment(req.body.commentID, req.body.text);
    res.status(200).json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID/comment', async (req, res) => {
  try {
    const comment = await removePostComment(
      req.params.postID,
      req.body.commentID
    );
    res.status(200).json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.post('/:postID/save', async (req, res) => {
  try {
    const post = await savePost(req.params.postID, req.body.userID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID/save', async (req, res) => {
  try {
    const post = await deleteSavePost(req.params.postID, req.body.userID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// No le veo sentido
router.get('/:postID/save', async (req, res) => {
  try {
    const posts = await getSavePost(req.body.userID);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.put('/:postID', async (req, res) => {
  try {
    const post = await editPost(req.params.postID, req.body);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID', async (req, res) => {
  try {
    const post = await removePost(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.post('/upload-image', async (req, res) => {
  try {
    if (req.files && req.files.image) {
        const result = await uploadImage(
          req.files.image as UploadedFile,
          req.body.userID,
          req.body.postID
        );
        res.status(200).json({ data: result });
    }
    res.status(400).json({ msg: 'Bad request' });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

export default router;
