import express from 'express';
import { getPost, getPostByTag, addPostLike, removePostLike } from './controller';

const router = express.Router();

router.get('/public/popular', (req, res) => {
  res.json({ message: 'OK' });
});

router.get('/:postID', async (req, res) => {
  try {
    const post = await getPost(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/tag/:tagID', async (req, res) => {
  try {
    const posts = await getPostByTag(req.params.tagID);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// middleware USUARIOS LOGUEADOS

router.post('/:postID/like', async (req, res) => {
  try {
    const post = await addPostLike(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error });
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

router.post('/:postID/comment', (req, res) => {
  res.json();
});

router.put('/:postID/comment', (req, res) => {
  res.json();
});

router.delete('/:postID/comment', (req, res) => {
  res.json();
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

router.post('/', (req, res) => {
  res.json();
});

router.put('/:postID', (req, res) => {
  res.json();
});

router.delete('/:postID', (req, res) => {
  res.json();
});

export default router;
