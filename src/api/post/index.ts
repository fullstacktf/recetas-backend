import express from 'express';

const router = express.Router();

router.get('/public/popular', (req, res) => {
  res.json();
});

router.get('/:postID', (req, res) => {
  res.json();
});

router.get('/tag/:tagID', (req, res) => {
  res.json();
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
