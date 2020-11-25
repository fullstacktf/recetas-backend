import express from 'express';
import { getPost, getPostByTag } from './controller';

const router = express.Router();

router.get('/public/popular', (req, res) => {
  res.json({ message: 'OK' });
});

router.get('/:postID', async (req, res) => {
  const post = await getPost(req.params.postID);
  res.json({ data: post });
});

router.get('/tag/:tagID', async (req, res) => {
  const posts = await getPostByTag(req.params.tagID);
  res.json({ data: posts });
});

// middleware USUARIOS LOGUEADOS

router.post('/:postID/like', (req, res) => {
  res.json();
});

router.delete('/:postID/like', (req, res) => {
  res.json();
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
