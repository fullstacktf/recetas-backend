import express from 'express';
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
  editPostComment
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

// middleware USUARIOS LOGUEADOS

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

router.post('/:postID/save', (req, res) => {
  res.json();
});

router.delete('/:postID/save', (req, res) => {
  res.json();
});

router.get('/:postID/save', (req, res) => {
  res.json();
});

router.put('/:postID', (req, res) => {
  res.json();
});

router.delete('/:postID', async (req, res) => {
  try {
    const post = await removePost(req.params.postID);
    res.status(200).json({ data: post });
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
